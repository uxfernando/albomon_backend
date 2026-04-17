import { BattleEntity } from "../../domain/entities/Battle.entity";
import { PlayerEntity } from "../../domain/entities/Player.entity";
import { PokemonEntity } from "../../domain/entities/Pokemon.entity";

import { IBattleRepository } from "../../domain/repositories/IBattle.repository";
import { IPokemonRepository } from "../../domain/repositories/IPokemon.repository";

export class JoinLobbyUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private pokemonRepository: IPokemonRepository,
  ) {}

  async join(nickname: string) {}
}
