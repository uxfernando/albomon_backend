import { MongoBattleRepository } from "../../infrastructure/repositories/MongoBattle.repository";
import { ExternalPokemonRepository } from "../../infrastructure/repositories/ExternalPokemon.repository";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";
import { AssignPokemonsUseCase } from "../../application/use-cases/AssignPokemons.usecase";
import { PlayerReadyUseCase } from "../../application/use-cases/PlayerReady.usecase";
import { BattleController } from "../../presentation/controllers/battle.controller";

// Repository dependencies
const battleRepository = new MongoBattleRepository();
const pokemonRepository = new ExternalPokemonRepository();

// Use cases
const joinLobbyUseCase = new JoinLobbyUseCase(
  battleRepository
);

const assignPokemonsUseCase = new AssignPokemonsUseCase(
  battleRepository,
  pokemonRepository,
);

const playerReadyUseCase = new PlayerReadyUseCase(
  battleRepository
);

// Controller dependencies
export const battleController = new BattleController(
  joinLobbyUseCase,
  assignPokemonsUseCase,
  playerReadyUseCase
);
