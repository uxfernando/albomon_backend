import { Request, Response } from "express";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";

export class BattleController {
  private readonly joinLobbyUseCase: JoinLobbyUseCase;

  constructor(joinLobbyUseCase: JoinLobbyUseCase) {
    this.joinLobbyUseCase = joinLobbyUseCase;
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
      res.status(400).json({ success: false, error: error.message });
    }
  };
}
