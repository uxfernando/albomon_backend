import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { DomainError } from "@/shared/errors/AppError";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { ErrorMessages } from "@/shared/constants/errorMessages.constants";
import { PlayerReadyDto } from "@/application/dtos/lobby/PlayerReady.dto";
import { BattleStatus } from "@/shared/enums/Battle.enum";

export class PlayerReadyUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute(dto: PlayerReadyDto) {
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError(ErrorMessages.BATTLE_NOT_FOUND);
    }

    battle.setReady(dto.nickname);

    await this.battleRepository.save(battle);

    // Notify depending on the status
    if (battle.status === BattleStatus.Battling) {
      this.notifier.notifyBattleStart(battle);
    } else {
      this.notifier.notifyLobbyStatus(battle);
    }

    return battle;
  }
}
