import fs from 'fs';
import sql from 'mssql';
import path from 'path';

import { dbConfig } from '../config/dbConnection.js';
import { generateCreateTableTemplate } from '../Templates/tableTemplate.js';

export const tableGenerator = async (req, res) => {
  const { tableName, columns } = req.body;

  try {
    const tableScript = generateCreateTableTemplate(tableName, columns);
    const filePath = path.join('generated', `${tableName}_table.sql`);

    fs.writeFileSync(filePath, tableScript);

    const pool = await sql.connect(dbConfig);
    await pool.request().query(tableScript);

    res.status(200).send({
      message: '✅ Table created successfully.',
      file: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};
