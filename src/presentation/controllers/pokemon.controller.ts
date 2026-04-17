import { Request, Response } from "express";
import { AssignPokemonsUseCase } from "../../application/use-cases/pokemon/AssignPokemons.usecase";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../../infrastructure/utils/response.util";

export class PokemonController {
  private readonly assignPokemonsUseCase: AssignPokemonsUseCase;

  constructor(assignPokemonsUseCase: AssignPokemonsUseCase) {
    this.assignPokemonsUseCase = assignPokemonsUseCase;
  }

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
}
