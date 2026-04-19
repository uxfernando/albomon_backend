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

    connectedUsers.set(nickname, socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(LOBBY_ID);
      console.log(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${nickname} [${socket.id}]`);
      connectedUsers.delete(nickname);
    });
  });
};
