import { BattleEntity } from "@/domain/entities/Battle.entity";
import { BattleTurnResult } from "@/shared/interfaces/Battle.interface";

export interface IBattleNotifier {
  notifyLobbyStatus(battle: BattleEntity): void;
  notifyBattleStart(battle: BattleEntity): void;
  notifyTurnResult(turnResult: BattleTurnResult | null): void;
  notifyBattleEnd(winnerId: string): void;
}
