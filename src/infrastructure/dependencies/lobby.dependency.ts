import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { JoinLobbyUseCase } from "@/application/use-cases/lobby/JoinLobby.usecase";
import { PlayerReadyUseCase } from "@/application/use-cases/lobby/PlayerReady.usecase";
import { LobbyController } from "@/presentation/controllers/lobby.controller";
import { SocketBattleNotifier } from "@/infrastructure/notifiers/SocketBattle.notifier";
import { SocketServer } from "@/infrastructure/servers/Socket.server";

import { DisconnectUseCase } from "@/application/use-cases/lobby/Disconnect.usecase";

const battleRepository = new MongoBattleRepository();

const battleNotifier = new SocketBattleNotifier(SocketServer.getInstance());

const joinLobbyUseCase = new JoinLobbyUseCase(battleRepository, battleNotifier);
const playerReadyUseCase = new PlayerReadyUseCase(
  battleRepository,
  battleNotifier,
);
export const disconnectUseCase = new DisconnectUseCase(
  battleRepository,
  battleNotifier,
);

export const lobbyController = new LobbyController(
  joinLobbyUseCase,
  playerReadyUseCase,
);
