import { Request, Response } from "express";
import { JoinLobbyUseCase } from "@/application/use-cases/lobby/JoinLobby.usecase";
import { PlayerReadyUseCase } from "@/application/use-cases/lobby/PlayerReady.usecase";
import { JoinLobbyDto } from "@/application/dtos/lobby/JoinLobby.dto";
import { PlayerReadyDto } from "@/application/dtos/lobby/PlayerReady.dto";
import {
  successResponse,
  errorResponse,
} from "@/infrastructure/utils/response.util";

export class LobbyController {
  private readonly joinLobbyUseCase: JoinLobbyUseCase;
  private readonly playerReadyUseCase: PlayerReadyUseCase;

  constructor(
    joinLobbyUseCase: JoinLobbyUseCase,
    playerReadyUseCase: PlayerReadyUseCase,
  ) {
    this.joinLobbyUseCase = joinLobbyUseCase;
    this.playerReadyUseCase = playerReadyUseCase;
  }

  public join = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as JoinLobbyDto;
      const battle = await this.joinLobbyUseCase.execute(dto);

      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };

  public setReady = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as PlayerReadyDto;
      const battle = await this.playerReadyUseCase.execute(dto);

      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };
}
