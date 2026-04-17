"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleReadyUseCase = void 0;
class ToggleReadyUseCase {
    battleRepository;
    constructor(battleRepository) {
        this.battleRepository = battleRepository;
    }
    async execute(nickname) {
        const battle = await this.battleRepository.findActiveBattle();
        if (!battle) {
            throw new Error("No active battle found");
        }
        const player = battle.players.find((p) => p.nickname === nickname);
        if (!player) {
            throw new Error("Player not found in this battle");
        }
        if (player.team.length === 0) {
            throw new Error("Player needs a team before being ready");
        }
        player.isReady = true;
        // Check if both players are ready to start the battle
        if (battle.players.length === 2 && battle.players.every((p) => p.isReady)) {
            battle.startBattle();
        }
        await this.battleRepository.save(battle);
        return battle;
    }
}
exports.ToggleReadyUseCase = ToggleReadyUseCase;
