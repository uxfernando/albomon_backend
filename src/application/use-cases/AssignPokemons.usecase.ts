import { PokemonEntity } from "../../domain/entities/Pokemon.entity";
import { IBattleRepository } from "../../domain/repositories/IBattle.repository";
import { IPokemonRepository } from "../../domain/repositories/IPokemon.repository";
import { DomainError } from "../../shared/errors/AppError";

export class AssignPokemonsUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute(nickname: string) {
    const LOBBY_ID = "unique-stadium-lobby";
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError("Battle not found.");
    }

    const player = battle.players.find((p) => p.nickname === nickname);
    if (!player) {
      throw new DomainError(
        `Player with nickname '${nickname}' not found in the battle.`,
      );
    }

    if (player.pokemonTeam.length > 0) {
      throw new DomainError("Player already has a Pokemon team assigned.");
    }

    const allPokemon = await this.pokemonRepository.findAllBase();

    // Regla: No repetir Pokémon entre jugadores en el mismo lobby
    const usedPokemonIds = battle.players.flatMap((p) =>
      p.pokemonTeam.map((poke: PokemonEntity) => poke.id),
    );

    const availablePokemon = allPokemon.filter(
      (p) => !usedPokemonIds.includes(p.id),
    );

    // Elegir 3 aleatorios de los disponibles
    const randomPokemonSelection = availablePokemon
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const fullTeam = await Promise.all(
      randomPokemonSelection.map((p) => this.pokemonRepository.findById(p.id)),
    );

    player.pokemonTeam.push(...fullTeam);

    await this.battleRepository.save(battle);

    return battle;
  }
}
