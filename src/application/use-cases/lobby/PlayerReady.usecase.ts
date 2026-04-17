import { IBattleRepository } from "../../../domain/repositories/IBattle.repository";
import { DomainError } from "../../../shared/errors/AppError";
import { LOBBY_ID } from "../../../shared/constants/battle.constants";
import { ErrorMessages } from "../../../shared/constants/errorMessages.constants";
import { PlayerReadyDto } from "../../dtos/lobby/PlayerReady.dto";

export class PlayerReadyUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute(dto: PlayerReadyDto) {
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError(ErrorMessages.BATTLE_NOT_FOUND);
    }

    battle.setReady(dto.nickname);

    await this.battleRepository.save(battle);

    return battle;
  }
}
