import fs from "fs";
import sql from "mssql";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { dbConfig } from "../config/dbConnection.js";
import { generateCreateTableTemplate } from "../Templates/tableTemplate.js";

/**
 * Ensure metadata tables exist (only runs if missing)
 */
const ensureMetadataTables = async (pool) => {
  // Create app_tables if it doesn't exist
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'app_tables') AND type = 'U')
    BEGIN
        CREATE TABLE app_tables (
            id UNIQUEIDENTIFIER PRIMARY KEY,
            table_name NVARCHAR(255) NOT NULL,
            description NVARCHAR(MAX) NULL,
            created_at DATETIME DEFAULT GETDATE()
        )
    END
  `);

  // Create app_columns if it doesn't exist
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'app_columns') AND type = 'U')
    BEGIN
        CREATE TABLE app_columns (
            id UNIQUEIDENTIFIER PRIMARY KEY,
            table_id UNIQUEIDENTIFIER NOT NULL,
            column_name NVARCHAR(255) NOT NULL,
            data_type NVARCHAR(100) NOT NULL,
            is_primary BIT NOT NULL DEFAULT 0,
            is_foreign BIT NOT NULL DEFAULT 0,
            references_table NVARCHAR(255) NULL,
            references_column NVARCHAR(255) NULL,
            is_nullable BIT NOT NULL DEFAULT 1,
            description NVARCHAR(MAX) NULL,
            created_at DATETIME DEFAULT GETDATE(),
            FOREIGN KEY (table_id) REFERENCES app_tables(id)
        )
    END
  `);
};

export const tableGenerator = async (req, res) => {
  const { tableName, columns, description } = req.body;
  const tableId = uuidv4();

  let pool;
  let transaction;

  try {
    // Generate SQL script for actual DB table
    const tableScript = generateCreateTableTemplate(
      tableName,
      columns,
      description
    );

    // Ensure "generated" folder exists
    const dirPath = path.resolve("generated");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write SQL script to file
    const filePath = path.join(dirPath, `${tableName}_table.sql`);
    fs.writeFileSync(filePath, tableScript);

    // Connect to DB
    pool = await sql.connect(dbConfig);

    // Ensure metadata tables exist before proceeding
    await ensureMetadataTables(pool);

    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const request = new sql.Request(transaction);

    // Create table in SQL Server
    await request.batch(tableScript);

    // Insert into app_tables
    await new sql.Request(transaction)
      .input("id", sql.UniqueIdentifier, tableId)
      .input("tableName", sql.NVarChar, tableName)
      .input("description", sql.NVarChar, description || "").query(`
    INSERT INTO app_tables (id, table_name, description)
    VALUES (@id, @tableName, @description)
  `);

    // Insert into app_columns
    for (const col of columns) {
      const colId = uuidv4();
      await new sql.Request(transaction)
        .input("id", sql.UniqueIdentifier, colId)
        .input("table_id", sql.UniqueIdentifier, tableId)
        .input("column_name", sql.NVarChar, col.name)
        .input("data_type", sql.NVarChar, col.type)
        .input("is_primary", sql.Bit, col.isPrimary ? 1 : 0)
        .input("is_foreign", sql.Bit, col.isForeign ? 1 : 0)
        .input("references_table", sql.NVarChar, col.referencesTable || null)
        .input("references_column", sql.NVarChar, col.referencesColumn || null)
        .input("is_nullable", sql.Bit, col.isNullable ? 1 : 0)
        .input("description", sql.NVarChar, col.description || "").query(`
      INSERT INTO app_columns (
        id, table_id, column_name, data_type, is_primary, is_foreign,
        references_table, references_column, is_nullable, description
      )
      VALUES (
        @id, @table_id, @column_name, @data_type, @is_primary, @is_foreign,
        @references_table, @references_column, @is_nullable, @description
      )
    `);
    }

    // Commit transaction
    await transaction.commit();

    res.status(200).send({
      message: "✅ Table created successfully with metadata.",
      file: filePath,
      tableId,
    });
  } catch (err) {
    if (transaction && transaction._aborted !== true) {
      await transaction.rollback();
    }
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

export const getAllTables = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`
      SELECT 
        t.name AS table_name,
        ep.value AS description,
        t.create_date,
        t.modify_date,
        COUNT(c.column_id) AS column_count
      FROM sys.tables t
      LEFT JOIN sys.extended_properties ep 
        ON ep.major_id = t.object_id
        AND ep.minor_id = 0
        AND ep.name = 'MS_Description'
      LEFT JOIN sys.columns c
        ON c.object_id = t.object_id
      GROUP BY 
        t.name,
        ep.value,
        t.create_date,
        t.modify_date
      ORDER BY t.name;
    `);

    res.status(200).send({
      tables: result.recordset.map((row) => ({
        name: row.table_name,
        description: row.description || "",
        created_at: row.create_date,
        updated_at: row.modify_date,
        column_count: row.column_count,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getTablesList = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    // Fetch all app tables
    const tablesResult = await pool.request().query(`
      SELECT id AS tableId, table_name AS tableName, description, created_at
      FROM app_tables
      ORDER BY created_at DESC
    `);

    const tables = tablesResult.recordset;

    if (tables.length === 0) {
      return res.json({ tables: [] });
    }

    // Fetch all columns
    const columnsResult = await pool.request().query(`
      SELECT id AS columnId, table_id AS tableId, column_name AS name,
             data_type AS type, is_primary, is_foreign, references_table,
             references_column, is_nullable, description
      FROM app_columns
      ORDER BY table_id, created_at
    `);

    const columns = columnsResult.recordset;

    // Merge columns into tables
    const finalTables = tables.map((table) => ({
      tableId: table.tableId,
      tableName: table.tableName,
      description: table.description || "",
      created_at: table.created_at,
      columns: columns
        .filter((col) => col.tableId === table.tableId)
        .map((col) => ({
          columnId: col.columnId,
          name: col.name,
          type: col.type,
          isPrimary: !!col.is_primary,
          isForeign: !!col.is_foreign,
          referencesTable: col.references_table || null,
          referencesColumn: col.references_column || null,
          isNullable: !!col.is_nullable,
          description: col.description || ""
        }))
    }));

    res.json({ tables: finalTables });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};


/**
 * Deletes a table and its metadata
 * - Drops the actual table from DB
 * - Deletes entries from app_columns
 * - Deletes entry from app_tables
 */
export const deleteATable = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Table ID is required" });
  }

  let pool;
  let transaction;

  try {
    pool = await sql.connect(dbConfig);

    // Start a transaction
    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const request = new sql.Request(transaction);

    // Get the table name from app_tables
    const tableResult = await request
      .input("tableIdLookup", sql.UniqueIdentifier, id)
      .query(`SELECT table_name FROM app_tables WHERE id = @tableIdLookup`);

    if (tableResult.recordset.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ error: "Table not found" });
    }

    const tableName = tableResult.recordset[0].table_name;

    // Drop the actual database table
    await request.query(`DROP TABLE [${tableName}]`);

    // Delete columns metadata
    await request
      .input("tableIdColumns", sql.UniqueIdentifier, id)
      .query(`DELETE FROM app_columns WHERE table_id = @tableIdColumns`);

    // Delete table metadata
    await request
      .input("tableIdTable", sql.UniqueIdentifier, id)
      .query(`DELETE FROM app_tables WHERE id = @tableIdTable`);

    // Commit transaction
    await transaction.commit();

    res.status(200).json({ message: `Table "${tableName}" deleted successfully`, tableId: id });
  } catch (error) {
    if (transaction && !transaction._aborted) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const getATable = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Table ID is required" });
  }

  try {
    const pool = await sql.connect(dbConfig);

    // Fetch table metadata
    const tableResult = await pool.request()
      .input("tableId", sql.UniqueIdentifier, id)
      .query(`SELECT id AS tableId, table_name AS tableName, description, created_at 
              FROM app_tables 
              WHERE id = @tableId`);

    if (tableResult.recordset.length === 0) {
      return res.status(404).json({ error: "Table not found" });
    }

    const table = tableResult.recordset[0];

    // Fetch columns metadata
    const columnsResult = await pool.request()
      .input("tableId", sql.UniqueIdentifier, id)
      .query(`SELECT id AS columnId, column_name AS name, data_type AS type,
                     is_primary, is_foreign, references_table, references_column,
                     is_nullable, description
              FROM app_columns
              WHERE table_id = @tableId
              ORDER BY created_at`);

    const columns = columnsResult.recordset.map(col => ({
      columnId: col.columnId,
      name: col.name,
      type: col.type,
      isPrimary: !!col.is_primary,
      isForeign: !!col.is_foreign,
      referencesTable: col.references_table || null,
      referencesColumn: col.references_column || null,
      isNullable: !!col.is_nullable,
      description: col.description || ""
    }));

    res.status(200).json({
      table: {
        ...table,
        columns
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export const updateATable = async (req, res) => {
  const { id } = req.params;
  const { tableName, columns, description } = req.body;

  if (!id || !tableName || !Array.isArray(columns)) {
    return res.status(400).json({
      error: "Missing required fields: id, tableName, columns"
    });
  }

  let pool;
  let transaction;

  try {
    pool = await sql.connect(dbConfig);

    transaction = new sql.Transaction(pool);
    await transaction.begin();
    const request = new sql.Request(transaction);

    // Get current table name
    const result = await request
      .input("tableId", sql.UniqueIdentifier, id)
      .query(`SELECT table_name FROM app_tables WHERE id = @tableId`);

    if (result.recordset.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ error: "Table not found" });
    }

    const oldTableName = result.recordset[0].table_name;

    // Drop the old physical table
    await request.query(`DROP TABLE [${oldTableName}]`);

    // Generate SQL to recreate the table with new definition
    const newTableScript = generateCreateTableTemplate(
      tableName,
      columns,
      description
    );

    // Create the new physical table
    await request.batch(newTableScript);

    // Update metadata in app_tables
    await new sql.Request(transaction)
      .input("tableId", sql.UniqueIdentifier, id)
      .input("tableName", sql.NVarChar, tableName)
      .input("description", sql.NVarChar, description || "")
      .query(`
        UPDATE app_tables
        SET table_name = @tableName,
            description = @description
        WHERE id = @tableId
      `);

    // Delete old column metadata
    await new sql.Request(transaction)
      .input("tableId", sql.UniqueIdentifier, id)
      .query(`DELETE FROM app_columns WHERE table_id = @tableId`);

    // Insert new column metadata
    for (const col of columns) {
      const colId = uuidv4();
      await new sql.Request(transaction)
        .input("id", sql.UniqueIdentifier, colId)
        .input("table_id", sql.UniqueIdentifier, id)
        .input("column_name", sql.NVarChar, col.name)
        .input("data_type", sql.NVarChar, col.type)
        .input("is_primary", sql.Bit, col.isPrimary ? 1 : 0)
        .input("is_foreign", sql.Bit, col.isForeign ? 1 : 0)
        .input("references_table", sql.NVarChar, col.referencesTable || null)
        .input("references_column", sql.NVarChar, col.referencesColumn || null)
        .input("is_nullable", sql.Bit, col.isNullable ? 1 : 0)
        .input("description", sql.NVarChar, col.description || "")
        .query(`
          INSERT INTO app_columns (
            id, table_id, column_name, data_type, is_primary, is_foreign,
            references_table, references_column, is_nullable, description
          )
          VALUES (
            @id, @table_id, @column_name, @data_type, @is_primary, @is_foreign,
            @references_table, @references_column, @is_nullable, @description
          )
        `);
    }

    // Commit transaction
    await transaction.commit();

    res.status(200).json({
      message: `✅ Table "${oldTableName}" updated successfully.`,
      tableId: id,
      newTableName: tableName
    });

  } catch (error) {
    if (transaction && !transaction._aborted) {
      await transaction.rollback();
    }
    console.error("Error updating table:", error);
    res.status(500).json({ error: error.message });
  }
};

