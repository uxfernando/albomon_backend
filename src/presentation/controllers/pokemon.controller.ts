import { Request, Response } from "express";
import { AssignPokemonsUseCase } from "@/application/use-cases/pokemon/AssignPokemons.usecase";
import { AssignPokemonsDto } from "@/application/dtos/pokemon/AssignPokemons.dto";
import {
  successResponse,
  errorResponse,
} from "@/infrastructure/utils/response.util";

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
      const dto = req.body as AssignPokemonsDto;
      const battle = await this.assignPokemonsUseCase.execute(dto);

      successResponse(res, { battle });
    } catch (error: any) {
      errorResponse(res, error);
    }
  };
}
