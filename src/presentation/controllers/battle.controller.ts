import { Request, Response } from "express";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";
import { AssignPokemonsUseCase } from "../../application/use-cases/AssignPokemons.usecase";
import { PlayerReadyUseCase } from "../../application/use-cases/PlayerReady.usecase";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../../infrastructure/utils/response.util";

export class BattleController {
  private readonly joinLobbyUseCase: JoinLobbyUseCase;
  private readonly assignPokemonsUseCase: AssignPokemonsUseCase;
  private readonly playerReadyUseCase: PlayerReadyUseCase;

  constructor(
    joinLobbyUseCase: JoinLobbyUseCase,
    assignPokemonsUseCase: AssignPokemonsUseCase,
    playerReadyUseCase: PlayerReadyUseCase,
  ) {
    this.joinLobbyUseCase = joinLobbyUseCase;
    this.assignPokemonsUseCase = assignPokemonsUseCase;
    this.playerReadyUseCase = playerReadyUseCase;
  }

  public join = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        validationErrorResponse(res, "Nickname is required.");
        return;
      }

      const battle = await this.joinLobbyUseCase.execute(nickname);

      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };

  public assignPokemons = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        validationErrorResponse(res, "Nickname is required.");
        return;
      }

      const battle = await this.assignPokemonsUseCase.execute(nickname);

      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };

  public setReady = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        validationErrorResponse(res, "Nickname is required.");
        return;
      }

      const battle = await this.playerReadyUseCase.execute(nickname);

      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };
}
