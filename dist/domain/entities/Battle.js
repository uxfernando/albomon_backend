"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battle = void 0;
class Battle {
    players = [];
    status = "waiting";
    currentTurnPlayerId = null;
    winner = null;
    constructor() { }
    // Lógica para iniciar la batalla basada en Speed
    startBattle() {
        if (this.players.length !== 2)
            return;
        this.status = "battling";
        const p1Active = this.players[0].getActivePokemon();
        const p2Active = this.players[1].getActivePokemon();
        if (p1Active && p2Active) {
            // El primer turno es para quien tenga mayor Speed
            this.currentTurnPlayerId =
                p1Active.speed >= p2Active.speed
                    ? this.players[0].nickname
                    : this.players[1].nickname;
        }
    }
    // Cambio de turno estrictamente secuencial
    switchTurn() {
        const currentIndex = this.players.findIndex((p) => p.nickname === this.currentTurnPlayerId);
        const nextIndex = (currentIndex + 1) % 2;
        this.currentTurnPlayerId = this.players[nextIndex].nickname;
    }
}
exports.Battle = Battle;
