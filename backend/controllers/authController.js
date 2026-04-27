import User from "../models/User.js";
import { signToken } from "../middleware/authMiddleware.js";

/**
 * POST /auth/register
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const newUser = await User.create({ name, email, password, role });
    const token = signToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
};

/**
 * POST /auth/login
 * Authenticate a user and return a token
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message || "Login failed" });
  }
};

/**
 * GET /auth/me
 * Get the currently authenticated user's profile
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

export { register, login, getMe };
