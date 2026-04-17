import { Router } from "express";
import { battleController } from "../../infrastructure/dependencies/battle.dependency";

export class BattleRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/attack", battleController.attack);
    router.post("/reset", battleController.reset);

    return router;
  }
}
