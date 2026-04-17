import { Router } from "express";
import { battleController } from "../../infrastructure/dependencies/battle.dependency";

export class BattleRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/join", battleController.join);

    return router;
  }
}
