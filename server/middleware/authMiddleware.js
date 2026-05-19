import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

      // Attach user details to request context
      req.user = {
        id: decoded.id,
        role: decoded.role || "user",
        name: decoded.name,
        email: decoded.email,
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: "Not authorised, token verification failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorised, authorization token was not provided",
    });
  }
};

export default protect;
