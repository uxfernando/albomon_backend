import "dotenv/config";

export const envs = {
  PORT: Number(process.env.PORT) ?? 8080,
  MONGO_URI: process.env.MONGO_URI ?? "",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
};
