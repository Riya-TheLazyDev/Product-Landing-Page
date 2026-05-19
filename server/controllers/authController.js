import { generateToken } from "../utils/jwtHelper.js";
import { sendSuccess, sendError } from "../utils/responseHelper.js";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return sendError(res, "Please provide email and password", 400);
    }

    // Standard simulated profile values
    const mockUser = {
      id: role === "admin" ? "adm-demo" : "usr-demo",
      name: role === "admin" ? "Elevara Admin" : "Maison Guest",
      email,
      role: role || "user",
    };

    const token = generateToken({
      id: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
      name: mockUser.name,
    });

    return sendSuccess(res, { profile: mockUser, token }, "Login successful (Simulated API)");
  } catch (error) {
    return sendError(res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, "Please fill in all registration fields", 400);
    }

    const mockUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: "user",
    };

    const token = generateToken({
      id: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
      name: mockUser.name,
    });

    return sendSuccess(res, { profile: mockUser, token }, "User registered successfully (Simulated API)", 21);
  } catch (error) {
    return sendError(res, error.message);
  }
};

export const logout = async (req, res) => {
  return sendSuccess(res, { success: true }, "Logout successful");
};

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return sendError(res, "No user context found", 401);
  }
  return sendSuccess(res, { profile: req.user }, "Active profile retrieved successfully");
};
