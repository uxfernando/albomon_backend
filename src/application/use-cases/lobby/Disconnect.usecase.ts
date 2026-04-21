import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { BattleStatus } from "@/shared/enums/Battle.enum";

export class DisconnectUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute(nickname: string) {
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) return;

    const isPlayerInBattle = battle.players.some(
      (p) => p.nickname === nickname,
    );

    if (!isPlayerInBattle) return;

    // Remove player
    battle.players = battle.players.filter((p) => p.nickname !== nickname);

    if (battle.players.length === 0) {
      await this.battleRepository.delete(LOBBY_ID);
    } else {
      battle.status = BattleStatus.Waiting;
      battle.currentTurnPlayerId = null;
      battle.winnerId = null;

      // Reset remaining player's ready state
      if (battle.players[0]) {
        battle.players[0].isReady = false;
      }

      await this.battleRepository.save(battle);

      this.notifier.notifyOpponentDisconnect(nickname);
      this.notifier.notifyLobbyStatus(battle);
    }
  }
}
