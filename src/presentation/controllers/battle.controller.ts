import { Request, Response } from "express";
import { AttackUseCase } from "@/application/use-cases/battle/Attack.usecase";
import { ResetBattleUseCase } from "@/application/use-cases/battle/ResetBattle.usecase";
import { AttackDto } from "@/application/dtos/battle/Attack.dto";
import {
  successResponse,
  errorResponse,
} from "@/infrastructure/utils/response.util";

export class BattleController {
  private readonly attackUseCase: AttackUseCase;
  private readonly resetBattleUseCase: ResetBattleUseCase;

  constructor(
    attackUseCase: AttackUseCase,
    resetBattleUseCase: ResetBattleUseCase,
  ) {
    this.attackUseCase = attackUseCase;
    this.resetBattleUseCase = resetBattleUseCase;
  }

  public attack = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as AttackDto;
      const { battle, damageDealt } = await this.attackUseCase.execute(dto);

      successResponse(res, { battle, damageDealt });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };

  public reset = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.resetBattleUseCase.execute();
      successResponse(res, { message: "Battle reset successfully." });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };
}
