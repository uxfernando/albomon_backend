import { PokemonEntity } from "./Pokemon.entity";

export class PlayerEntity {
  public readonly nickname: string;
  public readonly team: PokemonEntity[];
  public isReady: boolean;

  constructor(
    nickname: string,
    team: PokemonEntity[],
    isReady: boolean = false,
  ) {
    if (team.length > 3) {
      throw new Error("A player can have a maximum of 3 Pokemons.");
    }
    this.nickname = nickname;
    this.team = team;
    this.isReady = isReady;
  }

  public get activePokemon(): PokemonEntity | undefined {
    return this.team.find((pokemon) => !pokemon.isDefeated);
  }

  public get hasAvailablePokemon(): boolean {
    return this.activePokemon !== undefined;
  }
}
