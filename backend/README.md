# 🛠️ SQL Generator API (Express + Node.js)

A lightweight API to automatically **generate SQL Server stored procedures** (CRUD) and **CREATE TABLE scripts** from JSON definitions.

---

## 🚀 Features

- Generate CRUD Stored Procedures
- Create Table SQL Scripts
- Save generated `.sql` files to the `/generated` folder
- Template-based generation (via `/Templates`)
- HTTP logging via Morgan + Winston
- Easy install and run

---

## ⚙️ Requirements

- **Node.js** (v14+ recommended)
- **npm**
- No database connection required — just generate scripts locally

---

## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SarathKalarikkal/SQL-Generator.git
   cd SQL-Generator

2. Install dependencies: npm install
   
3. mkdir generated, Templates, logs
   
4.Add a .env file at project root:
    PORT=port
    DB_USER=dbusername
    DB_PASS=password
    DB_SERVER=localhost
    DB_NAME=dbName



API Endpoints: 

  1. Generate Stored Procedure
     
    POST /api/generate-sp

    Generates a CRUD stored procedure based on your table and column definitions.
    
    {
      "spName": "productInsertUpdateDelete",
      "tableName": "Products",
      "Created": "Your Name",
      "ModifiedDate": "31-07-2025",
      "Description": "Handles CRUD for Products table",
      "Version": "1.0",
      "columns": [
        { "name": "ProductId", "type": "INT", "isPrimary": true },
        { "name": "ProductName", "type": "VARCHAR(100)" },
        { "name": "Price", "type": "DECIMAL(10,2)" }
      ]
    }
    → Output: SP script saved to /generated.

  2. Create Table Script
     
    POST /api/create-table

    Generates a SQL CREATE TABLE script from your JSON column definitions.
    
    {
      "tableName": "Products",
      "columns": [
        { "name": "ProductId", "type": "INT", "isPrimary": true },
        { "name": "ProductName", "type": "VARCHAR(100)" },
        { "name": "Price", "type": "DECIMAL(10,2)" }
      ]
    }
    → Output: .sql file created in /generated.
