import { PokemonEntity } from "../entities/Pokemon.entity";

export interface IPokemonRepository {
  getAll(): Promise<PokemonEntity[]>;
}
