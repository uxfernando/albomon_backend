import mongoose, { Schema } from "mongoose";
import { BattleStatus } from "./../../../../shared/enums/Battle.enum";

const PokemonSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: [String], required: true },
    hp: { type: Number, required: true },
    currentHp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true },
    sprite: { type: String, required: true },
  },
  { _id: false },
);

const PlayerSchema = new Schema(
  {
    nickname: { type: String, required: true },
    pokemonTeam: { type: [PokemonSchema], default: [] },
    isReady: { type: Boolean, default: false },
  },
  { _id: false },
);

const BattleSchema = new Schema({
  id: { type: String, required: true },
  players: { type: [PlayerSchema], default: [] },
  status: {
    type: String,
    enum: Object.values(BattleStatus),
    default: BattleStatus.Waiting,
  },
  currentTurnPlayerId: { type: String, default: null },
  winnerId: { type: String, default: null },
});

export const BattleModel = mongoose.model("Battle", BattleSchema);
