"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
class Pokemon {
    id;
    name;
    type;
    hp;
    attack;
    defense;
    speed;
    sprite;
    currentHp;
    isDefeated = false;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.hp = props.hp;
        this.attack = props.attack;
        this.defense = props.defense;
        this.speed = props.speed;
        this.sprite = props.sprite;
        this.currentHp = props.hp;
    }
    receiveDamage(damage) {
        this.currentHp = Math.max(0, this.currentHp - damage);
        if (this.currentHp === 0) {
            this.isDefeated = true;
        }
    }
}
exports.Pokemon = Pokemon;
