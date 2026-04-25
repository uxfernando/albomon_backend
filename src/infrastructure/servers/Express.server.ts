import express, { Application, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import http from "http";
import { requestLogger } from "@/presentation/middlewares/requestLogger.middleware";
import { errorLogger } from "@/presentation/middlewares/errorLogger.middleware";
import { getNetworkIp } from "@/infrastructure/utils/network";
import { logger } from "@/infrastructure/utils/logger";

interface ExpressServerOptions {
  port: number;
  routes: Router;
}

export class ExpressServer {
  public app: Application;
  private server: http.Server;
  private port: number;
  private routes: Router;
  private networkIp: string | null;

  constructor({ port, routes }: ExpressServerOptions) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.networkIp = getNetworkIp();
    this.port = port;
    this.routes = routes;

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(mongoSanitize());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestLogger);
  }

  private setupRoutes(): void {
    this.app.use("/api", this.routes);
    this.app.use(errorLogger);
  }

  public getServer(): http.Server {
    return this.server;
  }

  public start(): void {
    this.server.listen(this.port, () => {
      logger.info("[Express] Server is running at:");
      logger.info(`[Express] Local:   http://localhost:${this.port}`);
      if (this.networkIp) {
        logger.info(
          `[Express] Network: http://${this.networkIp}:${this.port} `,
        );
      }
    });
  }
}
