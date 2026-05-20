import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

// Helper to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, avatar, role } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide name, email, and password",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long",
      });
    }

    // 2. Check for duplicate email
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Email is already registered",
      });
    }

    // 3. Hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save user into MySQL users table
    // Default role = 'user' if not specified or not 'admin'
    const assignedRole = role === "admin" ? "admin" : "user";
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, phone, avatar, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone || null, avatar || null, assignedRole]
    );

    const newUserId = result.insertId;

    // 5. Generate secure JWT token
    const token = generateToken(newUserId, assignedRole);

    // 6. Return success response
    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUserId,
        name,
        email,
        role: assignedRole,
        phone: phone || null,
        avatar: avatar || null,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Registration failed. Internal database error or server is offline.",
    });
  }
};

/**
 * @desc    Login user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate email and password inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide both email and password",
      });
    }

    // 2. Locate user in MySQL database
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // 3. Compare secure hashed password using bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // 4. Generate secure JWT token
    const token = generateToken(user.id, user.role);

    // 5. Return token + user info
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || null,
        avatar: user.avatar || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Login failed. Internal database error or server is offline.",
    });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

/**
 * @desc    Get current user profile (protected route)
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentUser = async (req, res) => {
  try {
    // req.user has already been populated and synchronized by protect middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Not authorized, user context is missing",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone || null,
        avatar: req.user.avatar || null,
        created_at: req.user.created_at,
      },
    });
  } catch (error) {
    console.error("Get current user profile error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve user profile details.",
    });
  }
};

