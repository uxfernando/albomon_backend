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

  async execute(nickname: string) {
    // 1. Intentar buscar un lobby existente (usaremos un ID fijo para el "Lobby Único")
    const LOBBY_ID = "unique-stadium-lobby";
    let battle = await this.battleRepository.findById(LOBBY_ID);

    // 2. Si no existe, lo creamos (Primera vez que alguien entra)
    if (!battle) {
      battle = new BattleEntity(LOBBY_ID);
    }

    // 3. Obtener el catálogo de Pokémon para asignar el equipo
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

    // 4. Traer el detalle completo de esos 3 pokemones
    const fullTeam = await Promise.all(
      randomPokemonSelection.map((p) => this.pokemonRepository.findById(p.id)),
    );
    const newPlayer = new PlayerEntity(nickname, fullTeam);
    battle.addPlayer(newPlayer);

    // 5. PERSISTENCIA: Guardamos el estado actualizado en MongoDB
    await this.battleRepository.save(battle);

    return battle;
  }
}
