import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { BattleEntity } from "@/domain/entities/Battle.entity";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { BattleStatus } from "@/shared/enums/Battle.enum";

export class ResetBattleUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute() {
    let battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      battle = new BattleEntity(LOBBY_ID);
    } else {
      battle.status = BattleStatus.Waiting;
      battle.currentTurnPlayerId = null;
      battle.winnerId = null;
      battle.players.forEach((player) => {
        player.isReady = false;
        player.pokemonTeam = [];
      });
    }

    await this.battleRepository.save(battle);
    this.notifier.notifyLobbyStatus(battle);
  }
}
