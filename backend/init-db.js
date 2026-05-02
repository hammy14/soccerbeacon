const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  try {
    // Connect to the specific database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'soccer_site',
      port: process.env.DB_PORT || 3306,
    });

    console.log('✅ Connected to MySQL database:', process.env.DB_NAME);

    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema-fixed.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Remove CREATE DATABASE statement
    const cleanedSchema = schema.replace(/CREATE DATABASE IF NOT EXISTS.*?;/i, '').replace(/USE soccer_site;/i, '');

    // Split by semicolon and execute each statement
    const statements = cleanedSchema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          console.log('✅ Executed:', statement.substring(0, 50) + '...');
        } catch (err) {
          if (err.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log('⚠️  Table already exists:', statement.substring(0, 50) + '...');
          } else {
            throw err;
          }
        }
      }
    }

    console.log('✅ Database initialized successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
