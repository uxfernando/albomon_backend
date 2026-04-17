import pino from "pino";
import { envs } from "../../config/envs";

const isDevelopment = envs.NODE_ENV !== "production";

export const logger = pino({
  level: envs.LOG_LEVEL,
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname,responseTime",
        },
      }
    : undefined,
});
