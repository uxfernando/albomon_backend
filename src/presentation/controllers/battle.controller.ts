import { Request, Response } from "express";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";
import { AssignPokemonsUseCase } from "../../application/use-cases/AssignPokemons.usecase";
import { PlayerReadyUseCase } from "../../application/use-cases/PlayerReady.usecase";
import { AppError } from "../../shared/errors/AppError";

export class BattleController {
  private readonly joinLobbyUseCase: JoinLobbyUseCase;
  private readonly assignPokemonsUseCase: AssignPokemonsUseCase;
  private readonly playerReadyUseCase: PlayerReadyUseCase;

  constructor(
    joinLobbyUseCase: JoinLobbyUseCase,
    assignPokemonsUseCase: AssignPokemonsUseCase,
    playerReadyUseCase: PlayerReadyUseCase
  ) {
    this.joinLobbyUseCase = joinLobbyUseCase;
    this.assignPokemonsUseCase = assignPokemonsUseCase;
    this.playerReadyUseCase = playerReadyUseCase;
  }

  public join = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        res
          .status(400)
          .json({ success: false, error: "Nickname is required." });
        return;
      }

      const battle = await this.joinLobbyUseCase.execute(nickname);

      res.status(200).json({ success: true, battle });
    } catch (error: any) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      }
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  public assignPokemons = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        res
          .status(400)
          .json({ success: false, error: "Nickname is required." });
        return;
      }

      const battle = await this.assignPokemonsUseCase.execute(nickname);

      res.status(200).json({ success: true, battle });
    } catch (error: any) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      }
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  public setReady = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        res
          .status(400)
          .json({ success: false, error: "Nickname is required." });
        return;
      }

      const battle = await this.playerReadyUseCase.execute(nickname);

      res.status(200).json({ success: true, battle });
    } catch (error: any) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      }
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
}
