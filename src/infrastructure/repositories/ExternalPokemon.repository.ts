import axios from "axios";
import { IPokemonRepository } from "../../domain/repositories/IPokemon.repository";
import { PokemonEntity } from "../../domain/entities/Pokemon.entity";

export class ExternalPokemonRepository implements IPokemonRepository {
  private readonly baseUrl =
    "https://pokemon-api-92034153384.us-centrall.run.app";

  async findAllBase(): Promise<{ id: number; name: string; sprite: string }[]> {
    const response = await axios.get(`${this.baseUrl}/list`);
    return response.data;
  }

  async findById(id: number): Promise<PokemonEntity> {
    const response = await axios.get(`${this.baseUrl}/list/${id}`);
    const data = response.data;

    return new PokemonEntity(
      data.id,
      data.name,
      data.type,
      data.hp,
      data.attack,
      data.defense,
      data.speed,
      data.sprite,
    );
  }
}
