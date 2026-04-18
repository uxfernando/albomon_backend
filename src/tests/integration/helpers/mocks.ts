import { BattleEntity } from "@/domain/entities/Battle.entity";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { PokemonEntity } from "@/domain/entities/Pokemon.entity";

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
