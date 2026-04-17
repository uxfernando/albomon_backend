import { Router } from "express";
import { BattleController } from "../controllers/battle.controller";

export class BattleRoutes {
  static get routes(): Router {
    const router = Router();
    const battleController = new BattleController();

    router.post("/join", battleController.join);

    return router;
  }
}
