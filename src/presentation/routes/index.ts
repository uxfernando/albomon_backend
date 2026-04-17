import { Router } from "express";
import { HealthRoutes } from "./health.routes";
import { BattleRoutes } from "./battle.routes";
import { LobbyRoutes } from "./lobby.routes";
import { PokemonRoutes } from "./pokemon.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/health", HealthRoutes.routes);
    router.use("/lobby", LobbyRoutes.routes);
    router.use("/pokemon", PokemonRoutes.routes);
    router.use("/battle", BattleRoutes.routes);

    return router;
  }
}
