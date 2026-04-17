import { PokemonEntity } from "./Pokemon.entity";
import { DomainError } from "../../shared/errors/AppError";
import { ErrorMessages } from "../../shared/constants/errorMessages.constants";

export class PlayerEntity {
  public readonly nickname: string;
  public readonly pokemonTeam: PokemonEntity[];
  public isReady: boolean;

  constructor(
    nickname: string,
    pokemonTeam: PokemonEntity[],
    isReady: boolean = false,
  ) {
    if (pokemonTeam.length > 3) {
      throw new DomainError(ErrorMessages.PLAYER_MAX_POKEMONS);
    }

    this.nickname = nickname;
    this.pokemonTeam = pokemonTeam;
    this.isReady = isReady;
  }

  public get activePokemon(): PokemonEntity | undefined {
    return this.pokemonTeam.find((pokemon) => !pokemon.isDefeated);
  }

  public get hasAvailablePokemon(): boolean {
    return this.activePokemon !== undefined;
  }
}
