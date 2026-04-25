import * as cron from "node-cron";
import { ClearBattleUseCase } from "@/application/use-cases/battle/ClearBattle.usecase";
import { SocketServer } from "@/infrastructure/servers/Socket.server";
import { logger } from "@/infrastructure/utils/logger";

export class BattleCronJobs {
  private cronJob: cron.ScheduledTask | null = null;

  constructor(
    private clearBattleUseCase: ClearBattleUseCase,
    private socketServer: SocketServer,
  ) {}

  public start(): void {
    const cronExpression = "*/5 * * * *";

    logger.info(
      `[BattleCronJobs] Initializing clean cron job with expression: ${cronExpression}`,
    );

    this.cronJob = cron.schedule(cronExpression, async () => {
      logger.info("[BattleCronJobs] Executing battle inactivity check...");

      const connectedUsers = this.socketServer.getConnectedUsers();

      if (connectedUsers.size === 0) {
        logger.info(
          "[BattleCronJobs] No connected users. Cleaning battle now.",
        );
        await this.clearBattleUseCase.execute();
      } else {
        logger.info(
          `[BattleCronJobs] There are ${connectedUsers.size} connected users.`,
        );
      }
    });
  }

  public stop(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      logger.info("[BattleCronJobs] Cron job detenido.");
    }
  }
}
