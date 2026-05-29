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
        avatar VARCHAR(500) NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Ensure 'avatar' column exists for existing tables
    try {
      const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'avatar'");
      if (columns.length === 0) {
        await connection.query("ALTER TABLE users ADD COLUMN avatar VARCHAR(500) NULL AFTER phone");
        console.log("Database Migration: Added 'avatar' column to existing 'users' table");
      }
    } catch (columnErr) {
      console.warn("Database Migration Warn: Could not verify/alter 'avatar' column:", columnErr.message);
    }

    // 2. Create Products Table with image_url and updated_at support
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
        image_url VARCHAR(500) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    // 3. Shipping addresses (multi-address ready)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS shipping_addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address_line_1 VARCHAR(500) NOT NULL,
        address_line_2 VARCHAR(500) NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL DEFAULT 'India',
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_shipping_user (user_id)
      )
    `);

    // 4. Orders (payment_id reserved for Razorpay / webhooks)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        shipping_address_id INT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
        tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_status VARCHAR(50) DEFAULT 'Pending',
        order_status VARCHAR(50) DEFAULT 'Pending',
        payment_method VARCHAR(50) DEFAULT 'COD',
        payment_id VARCHAR(255) NULL,
        idempotency_key VARCHAR(100) NULL,
        notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_orders_idempotency (idempotency_key),
        INDEX idx_orders_user (user_id),
        INDEX idx_orders_status (order_status),
        INDEX idx_orders_created (created_at)
      )
    `);

    // 5. Order line items (product snapshots)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        image_url VARCHAR(500) NULL,
        sku VARCHAR(100) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_order_items_order (order_id),
        INDEX idx_order_items_product (product_id)
      )
    `);

    // 6. Media assets for non-product site/admin visuals
    await connection.query(`
      CREATE TABLE IF NOT EXISTS media_assets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section_key VARCHAR(120) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        media_type ENUM('image', 'video') NULL,
        media_url VARCHAR(500) NULL,
        quote_text TEXT NULL,
        quote_author VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_media_section_key (section_key),
        INDEX idx_media_type (media_type)
      )
    `);

    try {
      const [quoteTextColumns] = await connection.query("SHOW COLUMNS FROM media_assets LIKE 'quote_text'");
      if (quoteTextColumns.length === 0) {
        await connection.query("ALTER TABLE media_assets ADD COLUMN quote_text TEXT NULL AFTER media_url");
      }

      const [quoteAuthorColumns] = await connection.query("SHOW COLUMNS FROM media_assets LIKE 'quote_author'");
      if (quoteAuthorColumns.length === 0) {
        await connection.query("ALTER TABLE media_assets ADD COLUMN quote_author VARCHAR(255) NULL AFTER quote_text");
      }
    } catch (columnErr) {
      console.warn("Database Migration Warn: Could not verify/alter media quote columns:", columnErr.message);
    }

    const { MEDIA_SECTIONS } = await import("./mediaSections.js");
    const activeSectionKeys = MEDIA_SECTIONS.map((section) => section.section_key);
    const [removedMediaRows] = await connection.query(
      `SELECT section_key FROM media_assets WHERE section_key NOT IN (${activeSectionKeys.map(() => "?").join(", ")})`,
      activeSectionKeys
    );

    for (const row of removedMediaRows) {
      await connection.query("DELETE FROM media_assets WHERE section_key = ?", [row.section_key]);
    }

    for (const section of MEDIA_SECTIONS) {
      await connection.query(
        `INSERT INTO media_assets (section_key, title, media_type, media_url, quote_text, quote_author)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           media_type = COALESCE(media_type, VALUES(media_type)),
           media_url = COALESCE(media_url, VALUES(media_url)),
           quote_text = COALESCE(quote_text, VALUES(quote_text)),
           quote_author = COALESCE(quote_author, VALUES(quote_author))`,
        [
          section.section_key,
          section.title,
          section.media_type,
          section.media_url,
          section.quote_text || null,
          section.quote_author || null,
        ]
      );
    }

    const { seedUsersIfEmpty } = await import("../utils/seedUsers.js");
    const { seedProductsIfEmpty } = await import("../utils/seedProducts.js");
    await seedUsersIfEmpty(connection);
    await seedProductsIfEmpty(connection);

    console.log("Elevāra SQL database schema validated (users, products, orders, media)");
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
