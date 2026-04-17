"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosPokemonRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const Pokemon_1 = require("../../domain/entities/Pokemon");
class AxiosPokemonRepository {
    apiUrl = "https://pokemon-api-92034153384.us-central1.run.app/list";
    async getRandomTeam() {
        try {
            const response = await axios_1.default.get(this.apiUrl);
            const data = response.data.data;
            return data.map((p) => {
                // Since the API doesn't provide stats, we generate them randomly for the game logic
                // HP: 50-100, Attack: 10-30, Defense: 5-20, Speed: 10-100
                const hp = Math.floor(Math.random() * 51) + 50;
                const attack = Math.floor(Math.random() * 21) + 10;
                const defense = Math.floor(Math.random() * 16) + 5;
                const speed = Math.floor(Math.random() * 91) + 10;
                return new Pokemon_1.Pokemon({
                    id: p.id,
                    name: p.name,
                    type: [], // Not provided by API
                    hp: hp,
                    attack: attack,
                    defense: defense,
                    speed: speed,
                    sprite: p.sprite,
                });
            });
        }
        catch (error) {
            console.error("Error fetching pokemon list:", error);
            throw new Error("Failed to fetch pokemon list");
        }
    }
}
exports.AxiosPokemonRepository = AxiosPokemonRepository;
