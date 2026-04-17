import { MongoBattleRepository } from "../../infrastructure/repositories/MongoBattle.repository";
import { JoinLobbyUseCase } from "../../application/use-cases/lobby/JoinLobby.usecase";
import { PlayerReadyUseCase } from "../../application/use-cases/lobby/PlayerReady.usecase";
import { LobbyController } from "../../presentation/controllers/lobby.controller";

// Repository dependencies
const battleRepository = new MongoBattleRepository();

// Use cases
const joinLobbyUseCase = new JoinLobbyUseCase(battleRepository);
const playerReadyUseCase = new PlayerReadyUseCase(battleRepository);

// Controller dependencies
export const lobbyController = new LobbyController(
  joinLobbyUseCase,
  playerReadyUseCase
);
