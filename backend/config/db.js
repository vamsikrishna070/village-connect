import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  const localFallbackUri =
    process.env.MONGO_URI_FALLBACK ?? "mongodb://127.0.0.1:27017/villageconnect";

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (primaryError) {
    console.warn(
      `Primary MongoDB connection failed: ${primaryError?.message ?? "Unknown error"}`
    );

    const shouldTryFallback = process.env.NODE_ENV !== "production";
    if (!shouldTryFallback) {
      console.error(
        `MongoDB not connected: ${primaryError?.message ?? "Unknown error"}`
      );
      process.exit(1);
    }

    try {
      await mongoose.connect(localFallbackUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("MongoDB connected successfully (fallback)");
      return mongoose.connection;
    } catch (fallbackError) {
      console.error(
        `MongoDB fallback also failed: ${fallbackError?.message ?? "Unknown error"}`
      );
      process.exit(1);
    }
  }
};

const disconnectDB = () => {
  return mongoose.disconnect();
};

export { connectDB, disconnectDB };
export default mongoose;
