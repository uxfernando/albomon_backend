import { Request, Response } from "express";
import { AttackUseCase } from "@/application/use-cases/battle/Attack.usecase";
import { ResetBattleUseCase } from "@/application/use-cases/battle/ResetBattle.usecase";
import { AttackDto } from "@/application/dtos/battle/Attack.dto";
import { GetBattleDetailsUseCase } from "@/application/use-cases/battle/GetDetails.usecase";
import {
  successResponse,
  errorResponse,
} from "@/infrastructure/utils/response.util";

export class BattleController {
  private readonly attackUseCase: AttackUseCase;
  private readonly resetBattleUseCase: ResetBattleUseCase;
  private readonly getBattleDetailsUseCase: GetBattleDetailsUseCase;

  constructor(
    attackUseCase: AttackUseCase,
    resetBattleUseCase: ResetBattleUseCase,
    getBattleDetailsUseCase: GetBattleDetailsUseCase,
  ) {
    this.attackUseCase = attackUseCase;
    this.resetBattleUseCase = resetBattleUseCase;
    this.getBattleDetailsUseCase = getBattleDetailsUseCase;
  }

  public getBattleDetails = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const battle = await this.getBattleDetailsUseCase.execute();
      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };

  public attack = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as AttackDto;
      const { battle, turnResult } = await this.attackUseCase.execute(dto);

      successResponse(res, { battle, turnResult });
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
