import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { LOBBY_ID } from "@/shared/constants/battle.constants";

export class ResetBattleUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute() {
    await this.battleRepository.delete(LOBBY_ID);
  }
}
