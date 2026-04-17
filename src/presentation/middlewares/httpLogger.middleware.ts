import pinoHttp from "pino-http";
import { logger } from "../../infrastructure/utils/logger";

export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} - Status: ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} - Status: ${res.statusCode} - Error: ${err.message}`;
  },
  serializers: {
    req: () => undefined,
    res: () => undefined,
  },
});
