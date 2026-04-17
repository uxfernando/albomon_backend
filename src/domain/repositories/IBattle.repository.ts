import { BattleEntity } from "../entities/Battle.entity";

export interface IBattleRepository {
  save(battle: BattleEntity): Promise<void>;
  findById(id: string): Promise<BattleEntity | null>;
}
