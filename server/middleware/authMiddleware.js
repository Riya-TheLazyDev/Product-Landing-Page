import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

/**
 * Middleware to protect routes by validating JWT Bearer tokens.
 * Decodes the user ID and role, queries the database to ensure the user exists,
 * and attaches the synchronized user profile to the request context.
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Check for Bearer token in authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          error: "Not authorized, authorization token is missing or malformed",
        });
      }

      // 2. Decode and verify token
      const secret = process.env.JWT_SECRET || "elevara_secret_key";
      const decoded = jwt.verify(token, secret);

      // 3. Database lookup to fetch synchronized user details
      const [users] = await pool.query(
        "SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE id = ?",
        [decoded.id]
      );
      const user = users[0];

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Not authorized, user profile no longer exists in database",
        });
      }

      // 4. Attach verified user to request context
      req.user = user;
      return next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      
      let errorMessage = "Not authorized, token verification failed";
      if (error.name === "TokenExpiredError") {
        errorMessage = "Not authorized, token has expired";
      } else if (error.name === "JsonWebTokenError") {
        errorMessage = "Not authorized, invalid token format";
      }

      return res.status(401).json({
        success: false,
        error: errorMessage,
      });
    }
  }

  // 5. Block request if token is completely missing
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized, no token provided",
    });
  }
};

export default protect;

