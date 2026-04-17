import { DomainError } from "../../../shared/errors/AppError";
import { LOBBY_ID } from "../../../shared/constants/battle.constants";
import { IBattleRepository } from "../../../domain/repositories/IBattle.repository";
import { ErrorMessages } from "../../../shared/constants/errorMessages.constants";
import { AttackDto } from "../../dtos/battle/Attack.dto";

export class AttackUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute(dto: AttackDto) {
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError(ErrorMessages.BATTLE_NOT_FOUND);
    }

    const damageDealt = battle.executeAttack(dto.nickname);

    await this.battleRepository.save(battle);

    return { battle, damageDealt };
  }
}
