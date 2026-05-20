import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generates a secure JWT token for a given user.
 * Includes user id and role in the payload.
 * 
 * @param {string|number} userId - The authenticated user's ID
 * @param {string} role - The user's permission role
 * @returns {string} The signed JWT token
 */
export const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET || "elevara_secret_key";
  const expiresIn = process.env.JWT_EXPIRE || "30d";

  return jwt.sign(
    { id: userId, role },
    secret,
    { expiresIn }
  );
};

export default generateToken;
