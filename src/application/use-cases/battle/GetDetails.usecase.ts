import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { LOBBY_ID } from "@/shared/constants/battle.constants";

export class GetBattleDetailsUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute() {
    return this.battleRepository.findById(LOBBY_ID);
  }
}
