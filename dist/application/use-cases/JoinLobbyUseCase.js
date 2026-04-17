"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinLobbyUseCase = void 0;
const Player_1 = require("../../domain/entities/Player");
const Battle_1 = require("../../domain/entities/Battle");
class JoinLobbyUseCase {
    battleRepository;
    constructor(battleRepository) {
        this.battleRepository = battleRepository;
    }
    async execute(nickname) {
        let battle = await this.battleRepository.findActiveBattle();
        if (!battle) {
            battle = new Battle_1.Battle();
        }
        if (battle.status !== "waiting") {
            throw new Error("Battle already in progress or finished");
        }
        if (battle.players.length >= 2) {
            throw new Error("Lobby is full");
        }
        if (battle.players.some((p) => p.nickname === nickname)) {
            throw new Error("Nickname already taken");
        }
        const newPlayer = new Player_1.Player(nickname);
        battle.players.push(newPlayer);
        if (battle.players.length === 2) {
            battle.status = "ready";
        }
        await this.battleRepository.save(battle);
        return battle;
    }
}
exports.JoinLobbyUseCase = JoinLobbyUseCase;
