"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PokemonSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    currentHp: Number,
    isDefeated: Boolean,
    sprite: String,
});
const PlayerSchema = new mongoose_1.Schema({
    nickname: String,
    team: [PokemonSchema],
    isReady: Boolean,
});
const BattleSchema = new mongoose_1.Schema({
    players: [PlayerSchema],
    status: {
        type: String,
        enum: ["waiting", "ready", "battling", "finished"],
        default: "waiting",
    },
    currentTurnPlayerId: String,
    winner: String,
    active: { type: Boolean, default: true }, // To find the active battle
}, { timestamps: true });
exports.BattleModel = mongoose_1.default.model("Battle", BattleSchema);
