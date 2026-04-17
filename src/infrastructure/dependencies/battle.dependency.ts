import { MongoBattleRepository } from "../../infrastructure/repositories/MongoBattle.repository";
import { ExternalPokemonRepository } from "../../infrastructure/repositories/ExternalPokemon.repository";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";
import { AssignPokemonsUseCase } from "../../application/use-cases/AssignPokemons.usecase";
import { PlayerReadyUseCase } from "../../application/use-cases/PlayerReady.usecase";
import { AttackUseCase } from "../../application/use-cases/Attack.usecase";
import { BattleController } from "../../presentation/controllers/battle.controller";

// Repository dependencies
const battleRepository = new MongoBattleRepository();
const pokemonRepository = new ExternalPokemonRepository();

// Use cases
const joinLobbyUseCase = new JoinLobbyUseCase(battleRepository);

const assignPokemonsUseCase = new AssignPokemonsUseCase(
  battleRepository,
  pokemonRepository,
);

const playerReadyUseCase = new PlayerReadyUseCase(battleRepository);

const attackUseCase = new AttackUseCase(battleRepository);

// Controller dependencies
export const battleController = new BattleController(
  joinLobbyUseCase,
  assignPokemonsUseCase,
  playerReadyUseCase,
  attackUseCase,
);
