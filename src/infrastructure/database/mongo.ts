import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI ?? "";
    await mongoose.connect(mongoUri);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error({ err: error }, "Error connecting to MongoDB");
    process.exit(1);
  }
};
