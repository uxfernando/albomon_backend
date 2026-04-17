import { Router } from "express";
import { pokemonController } from "../../infrastructure/dependencies/pokemon.dependency";

export class PokemonRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/assign", pokemonController.assignPokemons);

    return router;
  }
}
