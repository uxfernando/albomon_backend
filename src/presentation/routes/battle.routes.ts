import { Router } from "express";
import { battleController } from "../../infrastructure/dependencies/battle.dependency";

export class BattleRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/join", battleController.join);
    router.post("/assign-pokemons", battleController.assignPokemons);
    router.post("/ready", battleController.setReady);
    router.post("/attack", battleController.attack);

    return router;
  }
}
