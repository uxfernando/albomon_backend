import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { logger } from "@/infrastructure/utils/logger";

export class ClearBattleUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute() {
    try {
      const battle = await this.battleRepository.findById(LOBBY_ID);
      if (battle) {
        await this.battleRepository.delete(LOBBY_ID);
        logger.info(`[ClearBattleUseCase] Battle ${LOBBY_ID} deleted successfully due to inactivity.`);
      } else {
        logger.info(`[ClearBattleUseCase] No battle found to delete.`);
      }
    } catch (error) {
      logger.error(`[ClearBattleUseCase] Error deleting battle: ${error}`);
    }
  }
}
