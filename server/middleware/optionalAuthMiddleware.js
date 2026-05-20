import jwt from "jsonwebtoken";
import pool from "../config/db.js";

/**
 * Optionally attaches req.user when a valid Bearer token is present.
 * Does not block the request when token is missing or invalid.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "elevara_secret_key"
    );

    const [rows] = await pool.query(
      "SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows[0]) {
      req.user = rows[0];
    }
  } catch {
    // Invalid or expired token — treat as public request
  }

  next();
};
