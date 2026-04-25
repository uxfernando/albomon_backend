import mongoose from "mongoose";
import { logger } from "@/infrastructure/utils/logger";
import { envs } from "@/config/envs";

export class MongoDatabase {
  public async connect(): Promise<void> {
    try {
      const mongoURI = envs.MONGO_URI;
      await mongoose.connect(mongoURI);
      logger.info("[MongoDB] MongoDB connected successfully");
    } catch (error) {
      logger.error({ err: error }, "[MongoDB] Error connecting to MongoDB");
      process.exit(1);
    }
  }
}
