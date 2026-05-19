import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || "fallback_secret";
  const expiresIn = process.env.JWT_EXPIRE || "30d";
  
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || "fallback_secret";
  return jwt.verify(token, secret);
};
