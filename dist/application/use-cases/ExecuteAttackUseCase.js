"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteAttackUseCase = void 0;
const DamageCalculator_1 = require("../../domain/logic/DamageCalculator");
class ExecuteAttackUseCase {
    battleRepository;
    constructor(battleRepository) {
        this.battleRepository = battleRepository;
    }
    async execute(attackerNickname) {
        const battle = await this.battleRepository.findActiveBattle();
        if (!battle) {
            throw new Error("No active battle found");
        }
        if (battle.status !== "battling") {
            throw new Error("Battle is not in progress");
        }
        if (battle.currentTurnPlayerId !== attackerNickname) {
            throw new Error("It's not your turn");
        }
        const attacker = battle.players.find((p) => p.nickname === attackerNickname);
        const defender = battle.players.find((p) => p.nickname !== attackerNickname);
        const attackerPokemon = attacker.getActivePokemon();
        const defenderPokemon = defender.getActivePokemon();
        if (!attackerPokemon || !defenderPokemon) {
            throw new Error("One of the players has no active pokemon");
        }
        const damage = DamageCalculator_1.DamageCalculator.calculate(attackerPokemon, defenderPokemon);
        defenderPokemon.receiveDamage(damage);
        const pokemonDefeated = defenderPokemon.isDefeated;
        let gameFinished = false;
        if (pokemonDefeated) {
            // Check if defender has more pokemon
            if (!defender.hasAvailablePokemon()) {
                battle.status = "finished";
                battle.winner = attacker.nickname;
                gameFinished = true;
            }
        }
        if (!gameFinished) {
            battle.switchTurn();
        }
        await this.battleRepository.save(battle);
        return {
            battle,
            damage,
            attackerNickname: attacker.nickname,
            defenderNickname: defender.nickname,
            pokemonDefeated,
            gameFinished,
        };
    }
}
exports.ExecuteAttackUseCase = ExecuteAttackUseCase;
