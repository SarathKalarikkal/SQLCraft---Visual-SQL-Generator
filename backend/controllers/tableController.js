import fs from "fs";
import sql from "mssql";
import path from "path";

import { dbConfig } from "../config/dbConnection.js";
import { generateCreateTableTemplate } from "../Templates/tableTemplate.js";

export const tableGenerator = async (req, res) => {
  const { tableName, columns, description } = req.body;

  try {
    const tableScript = generateCreateTableTemplate(tableName, columns, description);
    const filePath = path.join("generated", `${tableName}_table.sql`);

    fs.writeFileSync(filePath, tableScript);

    const pool = await sql.connect(dbConfig);
    await pool.request().batch(tableScript);
    res.status(200).send({
      message: "✅ Table created successfully.",
      file: filePath,
    });
  } catch (err) {
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
      tables: result.recordset.map(row => ({
        name: row.table_name,
        description: row.description || '',
        created_at: row.create_date,
        updated_at: row.modify_date,
        column_count: row.column_count
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
