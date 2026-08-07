import pool from './config/db.js';

export async function migrate() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to DB for Migration");
    
    const [columns] = await connection.query("SHOW COLUMNS FROM orders");
    const columnNames = columns.map(c => c.Field);
    
    const alterQueries = [];
    if (!columnNames.includes('exchange_reason')) {
      alterQueries.push("ALTER TABLE orders ADD COLUMN exchange_reason TEXT");
    }
    if (!columnNames.includes('exchange_requested_at')) {
      alterQueries.push("ALTER TABLE orders ADD COLUMN exchange_requested_at DATETIME");
    }
    if (!columnNames.includes('exchange_processed_at')) {
      alterQueries.push("ALTER TABLE orders ADD COLUMN exchange_processed_at DATETIME");
    }
    if (!columnNames.includes('exchange_processed_by')) {
      alterQueries.push("ALTER TABLE orders ADD COLUMN exchange_processed_by INT");
    }
    
    for (const q of alterQueries) {
      await connection.query(q);
      console.log("Executed: ", q);
    }
    
    console.log("Migration complete.");
    connection.release();
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

