import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { logger } from "@/infrastructure/utils/logger";

export class SocketServer {
  private static instance: SocketServer;
  private io!: SocketIOServer;

  // IMPORTANT:
  // Configure Redis to store user information instead of using this in-memory map.
  // This was done temporarily. It is not the best approach for moving forward with the project.
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
      logger.warn("[Socket.io] Server is already initialized.");
      return;
    }

    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    logger.info("[Socket.io] server initialized successfully");
  }

  public getIO(): SocketIOServer | undefined {
    return this.io;
  }

  public getConnectedUsers(): Map<string, string> {
    return this.connectedUsers;
  }
}
