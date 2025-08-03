import fs from 'fs';
import sql from 'mssql';
import path from 'path';
import { dbConfig } from '../config/dbConnection.js';
import { generateSPTemplate } from '../Templates/spTemplate.js';

export const sqlGenerator = async (req, res) => {
  const { spName, tableName, columns, Created, ModifiedDate } = req.body;

  try {
    // Generate the stored procedure script (pass creator info too)
    const spScript = generateSPTemplate(spName, tableName, columns, Created, ModifiedDate);

    // Save to local file
    const filePath = path.join('generated', `${spName}.sql`);
    fs.writeFileSync(filePath, spScript);

    // Connect to DB and run full batch
    const pool = await sql.connect(dbConfig);
    await pool.request().batch(spScript); // ✅ Use .batch instead of .query

    res.status(200).send({
      message: '✅ Stored Procedure created and executed successfully.',
      file: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};
