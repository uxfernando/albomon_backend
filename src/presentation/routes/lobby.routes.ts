import { Router } from "express";
import { lobbyController } from "../../infrastructure/dependencies/lobby.dependency";
import { validateSchema } from "../middlewares/validate.middleware";
import { JoinLobbySchema } from "../../application/dtos/lobby/JoinLobby.dto";
import { PlayerReadySchema } from "../../application/dtos/lobby/PlayerReady.dto";

export class LobbyRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/join", validateSchema(JoinLobbySchema), lobbyController.join);
    router.post("/ready", validateSchema(PlayerReadySchema), lobbyController.setReady);

    return router;
  }
}
