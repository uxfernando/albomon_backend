"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    nickname;
    team = [];
    isReady = false;
    constructor(nickname) {
        this.nickname = nickname;
    }
    // Obtiene el primer Pokémon que no haya sido derrotado
    getActivePokemon() {
        return this.team.find((p) => !p.isDefeated) || null;
    }
    hasAvailablePokemon() {
        return this.team.some((p) => !p.isDefeated);
    }
}
exports.Player = Player;
