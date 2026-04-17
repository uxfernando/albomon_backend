import { PokemonEntity } from "./Pokemon.entity";

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
      throw new Error("A player can have a maximum of 3 Pokemons.");
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
