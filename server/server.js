import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Setup database connectivity pool check
connectDatabase();

const server = app.listen(PORT, () => {
  console.log(`----------------------------------------------------`);
  console.log(`  ELEVĀRA LUXURY PORTAL SERVER STARTED SUCCESSFULLY`);
  console.log(`  Mode:        ${process.env.NODE_ENV || "development"}`);
  console.log(`  Port:        ${PORT}`);
  console.log(`  URL:         http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/test`);
  console.log(`----------------------------------------------------`);
});

// Handle unhandled promise rejections cleanly
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
