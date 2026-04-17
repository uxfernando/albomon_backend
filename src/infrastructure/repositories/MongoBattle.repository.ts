import { IBattleRepository } from "../../domain/repositories/IBattle.repository";
import { BattleEntity } from "../../domain/entities/Battle.entity";
import { PlayerEntity } from "../../domain/entities/Player.entity";
import { PokemonEntity } from "../../domain/entities/Pokemon.entity";
import { BattleModel } from "../database/mongodb/models/Battle.model";

export class MongoBattleRepository implements IBattleRepository {
  async findById(id: string): Promise<BattleEntity | null> {
    const battle = await BattleModel.findOne({ id }).lean();
    if (!battle) return null;

    const players = battle.players.map((p: any) => {
      const pokemonTeam = p.pokemonTeam.map(
        (poke: any) =>
          new PokemonEntity(
            poke.id,
            poke.name,
            poke.type,
            poke.hp,
            poke.attack,
            poke.defense,
            poke.speed,
            poke.sprite,
            poke.currentHp,
          ),
      );
      return new PlayerEntity(p.nickname, pokemonTeam, p.isReady);
    });

    return new BattleEntity(
      battle.id,
      players,
      battle.status as any,
      battle.currentTurnPlayerId,
    );
  }

  async save(battle: BattleEntity): Promise<void> {
    const data = {
      id: battle.id,
      status: battle.status,
      currentTurnPlayerId: battle.currentTurnPlayerId,
      players: battle.players.map((p) => ({
        nickname: p.nickname,
        isReady: p.isReady,
        pokemonTeam: p.pokemonTeam.map((poke: PokemonEntity) => ({
          id: poke.id,
          name: poke.name,
          type: poke.type,
          hp: poke.hp,
          currentHp: poke.currentHp,
          attack: poke.attack,
          defense: poke.defense,
          speed: poke.speed,
          sprite: poke.sprite,
        })),
      })),
    };

    await BattleModel.findOneAndUpdate({ id: battle.id }, data, {
      upsert: true,
    });
  }
}
