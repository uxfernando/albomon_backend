import { DomainError } from "@/shared/errors/AppError";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { ErrorMessages } from "@/shared/constants/errorMessages.constants";
import { AttackDto } from "@/application/dtos/battle/Attack.dto";
import { BattleStatus } from "@/shared/enums/Battle.enum";

export class AttackUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute(dto: AttackDto) {
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError(ErrorMessages.BATTLE_NOT_FOUND);
    }

    const turnResult = battle.executeAttack(dto.nickname);

    await this.battleRepository.save(battle);

    this.notifier.notifyTurnResult(turnResult);
    this.notifier.notifyLobbyStatus(battle);

    if (battle.status === BattleStatus.Finished) {
      this.notifier.notifyBattleEnd(battle.winnerId as string);
    }

    return { battle, turnResult };
  }
}
