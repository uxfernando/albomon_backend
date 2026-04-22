import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { AttackUseCase } from "@/application/use-cases/battle/Attack.usecase";
import { GetBattleDetailsUseCase } from "@/application/use-cases/battle/GetDetails.usecase";
import { ResetBattleUseCase } from "@/application/use-cases/battle/ResetBattle.usecase";
import { BattleController } from "@/presentation/controllers/battle.controller";
import { SocketBattleNotifier } from "@/infrastructure/notifiers/SocketBattle.notifier";
import { SocketServer } from "@/infrastructure/servers/Socket.server";

const battleRepository = new MongoBattleRepository();

const battleNotifier = new SocketBattleNotifier(SocketServer.getInstance());

const getBattleDetailsUseCase = new GetBattleDetailsUseCase(battleRepository);
const attackUseCase = new AttackUseCase(battleRepository, battleNotifier);
const resetBattleUseCase = new ResetBattleUseCase(
  battleRepository,
  battleNotifier,
);

export const battleController = new BattleController(
  attackUseCase,
  resetBattleUseCase,
  getBattleDetailsUseCase,
);
