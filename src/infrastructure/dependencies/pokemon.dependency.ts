import { MongoBattleRepository } from "../../infrastructure/repositories/MongoBattle.repository";
import { ExternalPokemonRepository } from "../../infrastructure/repositories/ExternalPokemon.repository";
import { AssignPokemonsUseCase } from "../../application/use-cases/pokemon/AssignPokemons.usecase";
import { PokemonController } from "../../presentation/controllers/pokemon.controller";

// Repository dependencies
const battleRepository = new MongoBattleRepository();
const pokemonRepository = new ExternalPokemonRepository();

// Use cases
const assignPokemonsUseCase = new AssignPokemonsUseCase(
  battleRepository,
  pokemonRepository,
);

// Controller dependencies
export const pokemonController = new PokemonController(
  assignPokemonsUseCase
);
