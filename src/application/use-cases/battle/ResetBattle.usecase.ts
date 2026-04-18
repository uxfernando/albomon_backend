import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { BattleEntity } from "@/domain/entities/Battle.entity";
import { LOBBY_ID } from "@/shared/constants/battle.constants";

export class ResetBattleUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute() {
    await this.battleRepository.delete(LOBBY_ID);
    const emptyBattle = new BattleEntity(LOBBY_ID);
    this.notifier.notifyLobbyStatus(emptyBattle);
  }
}
