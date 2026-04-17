import { Router } from "express";
import { lobbyController } from "../../infrastructure/dependencies/lobby.dependency";

export class LobbyRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/join", lobbyController.join);
    router.post("/ready", lobbyController.setReady);

    return router;
  }
}
