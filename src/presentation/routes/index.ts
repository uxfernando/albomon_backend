import { Router } from "express";
import { HealthRoutes } from "./health.routes";
import { BattleRoutes } from "./battle.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/health", HealthRoutes.routes);
    router.use("/battle", BattleRoutes.routes);

    return router;
  }
}
