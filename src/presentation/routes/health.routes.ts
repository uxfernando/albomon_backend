import { Router } from "express";
import { HealthController } from "../controllers/health.controller";

export class HealthRoutes {
  static get routes(): Router {
    const router = Router();
    const healthController = new HealthController();

    router.get("/check", healthController.check);

    return router;
  }
}
