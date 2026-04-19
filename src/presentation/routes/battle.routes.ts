import { Router } from "express";
import { battleController } from "@/infrastructure/dependencies/battle.dependency";
import { validateSchema } from "@/presentation/middlewares/validate.middleware";
import { AttackSchema } from "@/application/dtos/battle/Attack.dto";

export class BattleRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("", battleController.getBattleDetails);
    router.post(
      "/attack",
      validateSchema(AttackSchema),
      battleController.attack,
    );
    router.post("/reset", battleController.reset);

    return router;
  }
}
