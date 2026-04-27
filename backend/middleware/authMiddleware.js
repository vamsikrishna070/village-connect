import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"] ?? "villageconnect-secret-key";

/**
 * Sign a JWT token with the given payload
 */
const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

/**
 * Verify a JWT token and return the decoded payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

/**
 * Middleware: Require authentication via Bearer token
 * Extracts and verifies the JWT from Authorization header
 * Attaches decoded user to req.user
 */
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  req.user = payload;
  next();
};

/**
 * Middleware: Require specific role(s)
 * Must be used after requireAuth
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
};

/**
 * Generic error handling middleware
 */
const errorHandler = (err, req, res, _next) => {
  console.error("Server Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};

export { signToken, verifyToken, requireAuth, requireRole, errorHandler };
