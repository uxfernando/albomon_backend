import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { AttackUseCase } from "@/application/use-cases/battle/Attack.usecase";
import { ResetBattleUseCase } from "@/application/use-cases/battle/ResetBattle.usecase";
import { BattleController } from "@/presentation/controllers/battle.controller";

// Repository dependencies
const battleRepository = new MongoBattleRepository();

// Use cases
const attackUseCase = new AttackUseCase(battleRepository);
const resetBattleUseCase = new ResetBattleUseCase(battleRepository);

// Controller dependencies
export const battleController = new BattleController(
  attackUseCase,
  resetBattleUseCase,
);
