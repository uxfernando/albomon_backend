import { BattleEntity } from "@/domain/entities/Battle.entity";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { PokemonEntity } from "@/domain/entities/Pokemon.entity";
import { BattleTurnResult } from "@/shared/interfaces/Battle.interface";

export class MockBattleRepository implements IBattleRepository {
  private battle: BattleEntity | null = null;
  async save(b: BattleEntity) {
    this.battle = b;
  }
  async findById(id: string) {
    return this.battle;
  }
  async delete(id: string) {
    this.battle = null;
  }
}

export class MockBattleNotifier implements IBattleNotifier {
  notifyLobbyStatus(battle: BattleEntity): void {}
  notifyBattleStart(battle: BattleEntity): void {}
  notifyTurnResult(turnResult: BattleTurnResult | null): void {}
  notifyBattleEnd(winnerId: string): void {}
  notifyOpponentDisconnect(): void {}
  resetBattle(battle: BattleEntity): void {}
}

export const createMockPokemon = (
  id: number,
  name: string,
  hp: number,
  attack: number,
  defense: number,
  speed: number,
) => {
  return new PokemonEntity(
    id,
    name,
    ["normal"],
    hp,
    attack,
    defense,
    speed,
    "sprite.png",
  );
};
