import { Server as SocketIOServer, Socket } from "socket.io";
import { logger } from "@/infrastructure/utils/logger";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { SocketConnectionSchema } from "@/application/dtos/socket/SocketConnection.dto";
import { disconnectUseCase } from "@/infrastructure/dependencies/lobby.dependency";

export const setupSocketHandlers = (
  io: SocketIOServer,
  connectedUsers: Map<string, string>,
): void => {
  io.on("connection", (socket: Socket) => {
    const query = socket.handshake.query;
    const validation = SocketConnectionSchema.safeParse(query);

    if (!validation.success) {
      logger.warn(
        `[Socket.io] Connection rejected: [${socket.id}] due to invalid query`,
      );
      socket.disconnect();
      return;
    }

    const { nickname } = validation.data;

    connectedUsers.set(nickname, socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(LOBBY_ID);
      logger.info(
        `[Socket.io] Socket ${socket.id} as ${nickname} joined room: ${roomId}`,
      );
    });

    socket.on("disconnect", async () => {
      logger.info(`[Socket.io] User disconnected: ${nickname} [${socket.id}]`);
      connectedUsers.delete(nickname);
      try {
        await disconnectUseCase.execute(nickname);
      } catch (error) {
        logger.error(
          { err: error },
          `[Socket.io] Error handling disconnect for ${nickname}`,
        );
      }
    });
  });
};
