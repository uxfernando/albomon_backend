import { BattleEntity } from "@/domain/entities/Battle.entity";

export interface IBattleNotifier {
  notifyLobbyStatus(battle: BattleEntity): void;
  notifyBattleStart(battle: BattleEntity): void;
  notifyTurnResult(battle: BattleEntity, damageDealt?: number): void;
  notifyBattleEnd(battle: BattleEntity): void;
}
