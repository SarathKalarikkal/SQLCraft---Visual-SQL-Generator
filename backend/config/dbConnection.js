import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql.connect(dbConfig)
  .then(() => {
    console.log("✅ Connected to SQL Server successfully.");
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err);
  });
