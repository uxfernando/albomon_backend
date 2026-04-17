import { Router } from "express";
import { pokemonController } from "@/infrastructure/dependencies/pokemon.dependency";
import { validateSchema } from "@/presentation/middlewares/validate.middleware";
import { AssignPokemonsSchema } from "@/application/dtos/pokemon/AssignPokemons.dto";

export class PokemonRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/assign", validateSchema(AssignPokemonsSchema), pokemonController.assignPokemons);

    return router;
  }
}
