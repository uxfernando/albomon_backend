import { PokemonEntity } from "@/domain/entities/Pokemon.entity";

export interface IPokemonRepository {
  findAllBase(): Promise<{ id: number; name: string; sprite: string }[]>;
  findById(id: number): Promise<PokemonEntity>;
}
