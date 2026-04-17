import { MongoBattleRepository } from "../../infrastructure/repositories/MongoBattle.repository";
import { ExternalPokemonRepository } from "../../infrastructure/repositories/ExternalPokemon.repository";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";
import { BattleController } from "../../presentation/controllers/battle.controller";

const battleRepository = new MongoBattleRepository();
const pokemonRepository = new ExternalPokemonRepository();

const joinLobbyUseCase = new JoinLobbyUseCase(
  battleRepository,
  pokemonRepository,
);

export const battleController = new BattleController(joinLobbyUseCase);
