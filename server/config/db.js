import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool matching environmental specifications
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "elevara_db",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Dynamic Schema/Table Initializer
export const initializeSchema = async (connection) => {
  try {
    // 1. Create Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2. Create Products Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NULL,
        price DECIMAL(10, 2) NOT NULL,
        discount_price DECIMAL(10, 2) NULL,
        category VARCHAR(100) NOT NULL,
        stock INT DEFAULT 0,
        sku VARCHAR(100) UNIQUE NULL,
        featured BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Elevāra SQL database schema validated successfully (users and products tables verified)");
  } catch (error) {
    console.error("Elevāra DB Tables initialisation failed:", error.message);
  }
};

export const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connection pool established successfully");
    
    // Auto-run structural migrations to ensure tables are created
    await initializeSchema(connection);
    
    connection.release();
    return true;
  } catch (error) {
    console.warn("----------------------------------------------------------------------------------");
    console.warn("WARNING: Database connection could not be established immediately.");
    console.warn("To connect the backend, please execute these actions:");
    console.warn(" 1. Ensure MySQL Server is running locally on port 3306");
    console.warn(" 2. Create a database called 'elevara_db' (CREATE DATABASE elevara_db;)");
    console.warn(" 3. Update DB_USER and DB_PASSWORD credentials in your server/.env file");
    console.warn("----------------------------------------------------------------------------------");
    console.error("Database connection error details:", error.message);
    return false;
  }
};

export default pool;
