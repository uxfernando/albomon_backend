import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { logger } from "@/infrastructure/utils/logger";

export class SocketServer {
  private static instance: SocketServer;
  private io!: SocketIOServer;

  // IMPORTANT:
  // Configurar Redis para que se pueda almacenar la información de los usuarios
  // en lugar de usar este mapa en memoria. Esto se hizo provisionalmente. Para
  // avanzar en el proyecto, no es lo mejor.
  private connectedUsers: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer();
    }
    return SocketServer.instance;
  }

  public init(server: HttpServer): void {
    if (this.io) {
      logger.warn("SocketServer is already initialized.");
      return;
    }

    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    logger.info("Socket.IO server initialized successfully");
  }

  public getIO(): SocketIOServer | undefined {
    return this.io;
  }

  public getConnectedUsers(): Map<string, string> {
    return this.connectedUsers;
  }
}
