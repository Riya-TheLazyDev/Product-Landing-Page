import pool from './config/db.js';

async function migrate() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to DB");
    
    const [columns] = await connection.query("SHOW COLUMNS FROM orders");
    const columnNames = columns.map(c => c.Field);
    
    if (!columnNames.includes('return_reason')) {
      await connection.query("ALTER TABLE orders ADD COLUMN return_reason TEXT");
      console.log("Added return_reason");
    }
    if (!columnNames.includes('return_requested_at')) {
      await connection.query("ALTER TABLE orders ADD COLUMN return_requested_at DATETIME");
      console.log("Added return_requested_at");
    }
    if (!columnNames.includes('return_processed_at')) {
      await connection.query("ALTER TABLE orders ADD COLUMN return_processed_at DATETIME");
      console.log("Added return_processed_at");
    }
    if (!columnNames.includes('return_processed_by')) {
      await connection.query("ALTER TABLE orders ADD COLUMN return_processed_by INT");
      console.log("Added return_processed_by");
    }
    
    console.log("Migration complete.");
    connection.release();
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
