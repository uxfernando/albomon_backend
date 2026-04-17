import { Request, Response } from "express";
import { JoinLobbyUseCase } from "../../application/use-cases/JoinLobby.usecase";

export class BattleController {
  // Usamos minúscula para la propiedad por convención
  private readonly joinLobbyUseCase: JoinLobbyUseCase;

  constructor(joinLobbyUseCase: JoinLobbyUseCase) {
    this.joinLobbyUseCase = joinLobbyUseCase;
  }

  // Definir como función de flecha para mantener el contexto de 'this'
  public join = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nickname } = req.body;

      if (!nickname) {
        // El requerimiento pide nickname para entrar al lobby [cite: 28]
        res
          .status(400)
          .json({ success: false, error: "Nickname is required." });
        return;
      }

      // IMPORTANTE: 'await' porque el caso de uso interactúa con DB y API
      const battle = await this.joinLobbyUseCase.execute(nickname);

      // Devolvemos el estado del lobby (waiting, ready, etc.) [cite: 65, 81]
      res.status(200).json({ success: true, battle });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}
