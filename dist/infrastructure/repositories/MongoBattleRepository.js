"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBattleRepository = void 0;
const Battle_1 = require("../../domain/entities/Battle");
const Player_1 = require("../../domain/entities/Player");
const Pokemon_1 = require("../../domain/entities/Pokemon");
const BattleModel_1 = require("../database/models/BattleModel");
class MongoBattleRepository {
    async save(battle) {
        const battleData = {
            players: battle.players.map((p) => ({
                nickname: p.nickname,
                isReady: p.isReady,
                team: p.team.map((pok) => ({
                    id: pok.id,
                    name: pok.name,
                    hp: pok.hp,
                    attack: pok.attack,
                    defense: pok.defense,
                    speed: pok.speed,
                    currentHp: pok.currentHp,
                    isDefeated: pok.isDefeated,
                    sprite: pok.sprite,
                })),
            })),
            status: battle.status,
            currentTurnPlayerId: battle.currentTurnPlayerId,
            winner: battle.winner,
            active: battle.status !== "finished",
        };
        // Find if there's an active battle to update, or create a new one
        const existingBattle = await BattleModel_1.BattleModel.findOne({ active: true });
        if (existingBattle) {
            await BattleModel_1.BattleModel.findByIdAndUpdate(existingBattle._id, battleData);
        }
        else {
            await BattleModel_1.BattleModel.create(battleData);
        }
    }
    async findActiveBattle() {
        const battleDoc = await BattleModel_1.BattleModel.findOne({ active: true });
        if (!battleDoc)
            return null;
        const battle = new Battle_1.Battle();
        battle.status = battleDoc.status;
        battle.currentTurnPlayerId = battleDoc.currentTurnPlayerId || null;
        battle.winner = battleDoc.winner || null;
        battle.players = battleDoc.players.map((pDoc) => {
            const player = new Player_1.Player(pDoc.nickname);
            player.isReady = pDoc.isReady;
            player.team = pDoc.team.map((pokDoc) => {
                const pokemon = new Pokemon_1.Pokemon({
                    id: pokDoc.id,
                    name: pokDoc.name,
                    hp: pokDoc.hp,
                    attack: pokDoc.attack,
                    defense: pokDoc.defense,
                    speed: pokDoc.speed,
                    sprite: pokDoc.sprite,
                    type: [], // Not stored/needed for logic here
                });
                pokemon.currentHp = pokDoc.currentHp;
                pokemon.isDefeated = pokDoc.isDefeated;
                return pokemon;
            });
            return player;
        });
        return battle;
    }
}
exports.MongoBattleRepository = MongoBattleRepository;
