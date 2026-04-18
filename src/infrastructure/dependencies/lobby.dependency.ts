import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { JoinLobbyUseCase } from "@/application/use-cases/lobby/JoinLobby.usecase";
import { PlayerReadyUseCase } from "@/application/use-cases/lobby/PlayerReady.usecase";
import { LobbyController } from "@/presentation/controllers/lobby.controller";
import { SocketBattleNotifier } from "@/infrastructure/notifiers/SocketBattle.notifier";
import { SocketServer } from "@/infrastructure/servers/Socket.server";

// Repository dependencies
const battleRepository = new MongoBattleRepository();

// Notifier
const battleNotifier = new SocketBattleNotifier(SocketServer.getInstance());

// Use cases
const joinLobbyUseCase = new JoinLobbyUseCase(battleRepository, battleNotifier);
const playerReadyUseCase = new PlayerReadyUseCase(
  battleRepository,
  battleNotifier,
);

// Controller dependencies
export const lobbyController = new LobbyController(
  joinLobbyUseCase,
  playerReadyUseCase,
);
