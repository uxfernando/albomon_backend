import { MongoBattleRepository } from "@/infrastructure/repositories/MongoBattle.repository";
import { ExternalPokemonRepository } from "@/infrastructure/repositories/ExternalPokemon.repository";
import { AssignPokemonsUseCase } from "@/application/use-cases/pokemon/AssignPokemons.usecase";
import { PokemonController } from "@/presentation/controllers/pokemon.controller";
import { SocketBattleNotifier } from "@/infrastructure/notifiers/SocketBattle.notifier";
import { SocketServer } from "@/infrastructure/servers/Socket.server";

const battleRepository = new MongoBattleRepository();
const pokemonRepository = new ExternalPokemonRepository();

const battleNotifier = new SocketBattleNotifier(SocketServer.getInstance());

const assignPokemonsUseCase = new AssignPokemonsUseCase(
  battleRepository,
  pokemonRepository,
  battleNotifier,
);

export const pokemonController = new PokemonController(assignPokemonsUseCase);
