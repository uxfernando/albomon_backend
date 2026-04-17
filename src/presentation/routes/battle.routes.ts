import { Router } from "express";
import { BattleController } from "../controllers/battle.controller";
import { MongoBattleRepository } from "../../infrastructure/repositories/MongoBattle.repository";
import { ExternalPokemonRepository } from "../../infrastructure/repositories/ExternalPokemon.repository";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";

export class BattleRoutes {
  static get routes(): Router {
    const router = Router();

    // Composición de dependencias (Wiring)
    const battleRepository = new MongoBattleRepository();
    const pokemonRepository = new ExternalPokemonRepository();

    const joinLobbyUseCase = new JoinLobbyUseCase(
      battleRepository,
      pokemonRepository,
    );

    const battleController = new BattleController(joinLobbyUseCase);

    // Ahora el controlador funciona correctamente gracias a la función de flecha
    router.post("/join", battleController.join);

    return router;
  }
}
