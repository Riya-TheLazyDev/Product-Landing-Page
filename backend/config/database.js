const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Execute query helper
const query = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

// Get single row helper
const queryOne = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows[0] || null;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

// Insert helper
const insert = async (sql, params) => {
  try {
    const [result] = await pool.execute(sql, params);
    return {
      insertId: result.insertId,
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error('Insert error:', error);
    throw error;
  }
};

// Update helper
const update = async (sql, params) => {
  try {
    const [result] = await pool.execute(sql, params);
    return {
      affectedRows: result.affectedRows,
      changedRows: result.changedRows
    };
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};

// Delete helper
const deleteQuery = async (sql, params) => {
  try {
    const [result] = await pool.execute(sql, params);
    return {
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

// Close pool helper
const closePool = async () => {
  try {
    await pool.end();
    console.log('Database pool closed');
  } catch (error) {
    console.error('Error closing pool:', error);
  }
};

module.exports = {
  pool,
  testConnection,
  query,
  queryOne,
  insert,
  update,
  delete: deleteQuery,
  closePool
};
