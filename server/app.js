import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Import all routing modules
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";

import pool from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global request modifiers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve temporary upload directory statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Direct Test / Verification Endpoint
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully (Elevāra Scalable API Layer)",
    timestamp: new Date().toISOString(),
  });
});

// Database Verification Endpoint
app.get("/api/test-db", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query("SELECT 1 + 1 AS result;");
    connection.release();

    return res.status(200).json({
      success: true,
      message: "Database connected successfully",
      database: process.env.DB_NAME || "elevara_db",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Database connection failed",
      details: error.message,
    });
  }
});

// Mount modular sub-routing paths
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/returns", returnRoutes);

// Fallback error-catching middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
