import { Request, Response } from "express";

export class BattleController {
  public join(req: Request, res: Response): void {
    const { nickname } = req.body;
    res.status(200).json({ success: true, nickname });
  }
}
