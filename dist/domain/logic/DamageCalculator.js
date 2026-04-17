"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DamageCalculator = void 0;
class DamageCalculator {
    static calculate(attacker, defender) {
        // Fórmula: Damage = Attacker Attack - Defender Defense
        const rawDamage = attacker.attack - defender.defense;
        // Regla: Daño mínimo de 1
        return Math.max(1, rawDamage);
    }
}
exports.DamageCalculator = DamageCalculator;
