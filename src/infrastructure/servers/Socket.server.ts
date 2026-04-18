import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { logger } from "@/infrastructure/utils/logger";

import { setupSocketHandlers } from "@/presentation/handlers/socket.handler";

export class SocketServer {
  private static instance: SocketServer;
  private io!: SocketIOServer;

  // Mapa para guardar los sockets conectados usando el nickname
  // TODO: Usar una base de datos para almacenar la información de los usuarios
  // en lugar de usar este mapa en memoria.
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

    this.setupListeners();
    logger.info("Socket.IO server initialized successfully");
  }

  private setupListeners(): void {
    setupSocketHandlers(this.io, this.connectedUsers);
  }

  public getIO(): SocketIOServer | undefined {
    return this.io;
  }
}
