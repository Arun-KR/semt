import mongoose from "mongoose";

let isConnected = false;

const connectDB = async (retries = 5, delay = 5000) => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not set — skipping MongoDB connection");
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
      });
      isConnected = true;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt}/${retries} failed:`,
        error.message
      );

      if (attempt === retries) {
        console.error(
          "MongoDB connection failed after all retries. Continuing without database..."
        );
        // Don't exit process in Azure - let container stay alive for health checks
        return;
      }

      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export const getConnectionStatus = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  };
};

export default connectDB;
