import { PokemonEntity } from "@/domain/entities/Pokemon.entity";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IPokemonRepository } from "@/domain/repositories/IPokemon.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { DomainError } from "@/shared/errors/AppError";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { ErrorMessages } from "@/shared/constants/errorMessages.constants";
import { AssignPokemonsDto } from "@/application/dtos/pokemon/AssignPokemons.dto";

// IMPORTANT: Se debe usar Redis para manejar la cola de asignación de Pokémon
// para evitar condiciones de concurrencia en un mismo lobby. Por motivos de la
// prueba y tiempos se usará esto.
let assignmentQueue = Promise.resolve<any>(null);

export class AssignPokemonsUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private pokemonRepository: IPokemonRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute(dto: AssignPokemonsDto) {
    return new Promise((resolve, reject) => {
      assignmentQueue = assignmentQueue
        .then(async () => {
          try {
            const battle = await this.battleRepository.findById(LOBBY_ID);

            if (!battle) {
              throw new DomainError(ErrorMessages.BATTLE_NOT_FOUND);
            }

            const player = battle.players.find(
              (p) => p.nickname === dto.nickname,
            );
            if (!player) {
              throw new DomainError(
                ErrorMessages.PLAYER_NOT_FOUND(dto.nickname),
              );
            }

            if (player.pokemonTeam.length > 0) {
              throw new DomainError(ErrorMessages.PLAYER_ALREADY_HAS_TEAM);
            }

            const allPokemon = await this.pokemonRepository.findAllBase();

            const usedPokemonIds = battle.players.flatMap((p) =>
              p.pokemonTeam.map((poke: PokemonEntity) => poke.id),
            );

            const availablePokemon = allPokemon.filter(
              (p) => !usedPokemonIds.includes(p.id),
            );

            const randomPokemonSelection = availablePokemon
              .sort(() => 0.5 - Math.random())
              .slice(0, 3);

            const fullTeam = await Promise.all(
              randomPokemonSelection.map((p) =>
                this.pokemonRepository.findById(p.id),
              ),
            );

            player.pokemonTeam.push(...fullTeam);

            await this.battleRepository.save(battle);

            this.notifier.notifyLobbyStatus(battle);

            resolve(battle);
          } catch (error) {
            reject(error);
          }
        })
        .catch((err) => {
          console.error("Error in assignment queue", err);
        });
    });
  }
}
