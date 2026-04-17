import "dotenv/config";
import http from "http";
import { app } from "./infrastructure/app";
import { connectDB } from "./infrastructure/database/mongo";
import { getNetworkIp } from "./infrastructure/utils/network";
import { logger } from "./infrastructure/utils/logger";

const PORT = Number(process.env.PORT) || 8080;

const main = async () => {
  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    const networkIp = getNetworkIp();
    logger.info(`Server is running at:`);
    logger.info(`- Local:   http://localhost:${PORT}`);
    if (networkIp) {
      logger.info(`- Network: http://${networkIp}:${PORT}`);
    }
  });
};

main();
