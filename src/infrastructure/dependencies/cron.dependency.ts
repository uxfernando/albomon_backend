import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { ClearBattleUseCase } from "@/application/use-cases/battle/ClearBattle.usecase";
import { BattleCronJobs } from "@/infrastructure/cron/BattleCron";
import { SocketServer } from "@/infrastructure/servers/Socket.server";

const battleRepository = new MongoBattleRepository();
const clearBattleUseCase = new ClearBattleUseCase(battleRepository);

export const battleCronJobs = new BattleCronJobs(
  clearBattleUseCase,
  SocketServer.getInstance(),
);
