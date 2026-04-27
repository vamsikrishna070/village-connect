import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import grievanceRoutes from "./routes/grievanceRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler } from "./middleware/authMiddleware.js";

const app = express();

// Core middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api", authRoutes);
app.use("/api", jobRoutes);
app.use("/api", grievanceRoutes);
app.use("/api", serviceRoutes);
app.use("/api", dashboardRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
