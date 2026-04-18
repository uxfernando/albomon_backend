import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { AttackUseCase } from "@/application/use-cases/battle/Attack.usecase";
import { ResetBattleUseCase } from "@/application/use-cases/battle/ResetBattle.usecase";
import { BattleController } from "@/presentation/controllers/battle.controller";
import { SocketBattleNotifier } from "@/infrastructure/notifiers/SocketBattle.notifier";
import { SocketServer } from "@/infrastructure/servers/Socket.server";

// Repository dependencies
const battleRepository = new MongoBattleRepository();

// Notifier
const battleNotifier = new SocketBattleNotifier(SocketServer.getInstance());

// Use cases
const attackUseCase = new AttackUseCase(battleRepository, battleNotifier);
const resetBattleUseCase = new ResetBattleUseCase(
  battleRepository,
  battleNotifier,
);

// Controller dependencies
export const battleController = new BattleController(
  attackUseCase,
  resetBattleUseCase,
);
