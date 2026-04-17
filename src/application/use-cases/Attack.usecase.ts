import { IBattleRepository } from "../../domain/repositories/IBattle.repository";
import { DomainError } from "../../shared/errors/AppError";
import { LOBBY_ID } from "../../shared/constants/battle.constants";
import { ErrorMessages } from "../../shared/constants/errorMessages.constants";

export class AttackUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute(nickname: string) {
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError(ErrorMessages.BATTLE_NOT_FOUND);
    }

    battle.executeAttack(nickname);

    await this.battleRepository.save(battle);

    return battle;
  }
}
