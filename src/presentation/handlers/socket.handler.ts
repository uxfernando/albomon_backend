import { Server as SocketIOServer, Socket } from "socket.io";
import { logger } from "@/infrastructure/utils/logger";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { SocketConnectionSchema } from "@/application/dtos/socket/SocketConnection.dto";

export const setupSocketHandlers = (
  io: SocketIOServer,
  connectedUsers: Map<string, string>,
): void => {
  io.on("connection", (socket: Socket) => {
    const query = socket.handshake.query;
    const validation = SocketConnectionSchema.safeParse(query);

    if (!validation.success) {
      logger.warn(`Connection rejected: [${socket.id}]`);
      socket.disconnect();
      return;
    }

    const { nickname } = validation.data;

    logger.info(`User connected: ${nickname} [${socket.id}]`);
    connectedUsers.set(nickname, socket.id);

    // Join the unique lobby room
    socket.join(LOBBY_ID);
    logger.info(`User ${nickname} joined room ${LOBBY_ID}`);

    // TODO: Sincronizar estado inicial al conectarse

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${nickname} [${socket.id}]`);
      connectedUsers.delete(nickname);
    });
  });
};
