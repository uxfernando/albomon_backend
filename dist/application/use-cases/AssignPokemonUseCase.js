"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignPokemonUseCase = void 0;
class AssignPokemonUseCase {
    battleRepository;
    pokemonRepository;
    constructor(battleRepository, pokemonRepository) {
        this.battleRepository = battleRepository;
        this.pokemonRepository = pokemonRepository;
    }
    async execute() {
        const battle = await this.battleRepository.findActiveBattle();
        if (!battle) {
            throw new Error("No active battle found");
        }
        if (battle.status !== "ready") {
            throw new Error("Battle is not in ready status");
        }
        const allPokemon = await this.pokemonRepository.getRandomTeam();
        // We need 6 unique pokemon (3 for each player)
        if (allPokemon.length < 6) {
            throw new Error("Not enough pokemon available");
        }
        // Shuffle and pick 6
        const shuffled = [...allPokemon].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        battle.players[0].team = selected.slice(0, 3);
        battle.players[1].team = selected.slice(3, 6);
        await this.battleRepository.save(battle);
        return battle;
    }
}
exports.AssignPokemonUseCase = AssignPokemonUseCase;
