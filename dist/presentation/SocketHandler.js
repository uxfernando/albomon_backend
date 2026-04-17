"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
const JoinLobbyUseCase_1 = require("../application/use-cases/JoinLobbyUseCase");
const AssignPokemonUseCase_1 = require("../application/use-cases/AssignPokemonUseCase");
const ToggleReadyUseCase_1 = require("../application/use-cases/ToggleReadyUseCase");
const ExecuteAttackUseCase_1 = require("../application/use-cases/ExecuteAttackUseCase");
class SocketHandler {
    io;
    joinLobbyUseCase;
    assignPokemonUseCase;
    toggleReadyUseCase;
    executeAttackUseCase;
    constructor(io, battleRepository, pokemonRepository) {
        this.io = io;
        this.joinLobbyUseCase = new JoinLobbyUseCase_1.JoinLobbyUseCase(battleRepository);
        this.assignPokemonUseCase = new AssignPokemonUseCase_1.AssignPokemonUseCase(battleRepository, pokemonRepository);
        this.toggleReadyUseCase = new ToggleReadyUseCase_1.ToggleReadyUseCase(battleRepository);
        this.executeAttackUseCase = new ExecuteAttackUseCase_1.ExecuteAttackUseCase(battleRepository);
    }
    handleConnection(socket) {
        console.log(`New connection: ${socket.id}`);
        socket.on("join_lobby", async (data) => {
            try {
                const battle = await this.joinLobbyUseCase.execute(data.nickname);
                // Store nickname in socket for later use
                socket.nickname = data.nickname;
                this.io.emit("lobby_status", battle);
            }
            catch (error) {
                socket.emit("error", { message: error.message });
            }
        });
        socket.on("assign_pokemon", async () => {
            try {
                const battle = await this.assignPokemonUseCase.execute();
                this.io.emit("lobby_status", battle);
            }
            catch (error) {
                socket.emit("error", { message: error.message });
            }
        });
        socket.on("ready", async () => {
            try {
                const nickname = socket.nickname;
                if (!nickname)
                    throw new Error("Nickname not found for this session");
                const battle = await this.toggleReadyUseCase.execute(nickname);
                this.io.emit("lobby_status", battle);
                if (battle.status === "battling") {
                    this.io.emit("battle_start", battle);
                }
            }
            catch (error) {
                socket.emit("error", { message: error.message });
            }
        });
        socket.on("attack", async () => {
            try {
                const nickname = socket.nickname;
                if (!nickname)
                    throw new Error("Nickname not found for this session");
                const result = await this.executeAttackUseCase.execute(nickname);
                this.io.emit("turn_result", {
                    attacker: result.attackerNickname,
                    defender: result.defenderNickname,
                    damage: result.damage,
                    pokemonDefeated: result.pokemonDefeated,
                    battle: result.battle,
                });
                if (result.gameFinished) {
                    this.io.emit("battle_end", {
                        winner: result.battle.winner,
                        battle: result.battle,
                    });
                }
            }
            catch (error) {
                socket.emit("error", { message: error.message });
            }
        });
        socket.on("disconnect", () => {
            console.log(`Disconnected: ${socket.id}`);
        });
    }
}
exports.SocketHandler = SocketHandler;
