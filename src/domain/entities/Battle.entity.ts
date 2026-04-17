import { PlayerEntity } from "./Player.entity";

export type BattleStatus = "waiting" | "ready" | "battling" | "finished";

export class BattleEntity {
  public readonly id: string;
  public players: PlayerEntity[];
  public status: BattleStatus;
  public currentTurnPlayerId: string | null;

  constructor(
    id: string,
    players: PlayerEntity[] = [],
    status: BattleStatus = "waiting",
    currentTurnPlayerId: string | null = null,
  ) {
    this.id = id;
    this.players = players;
    this.status = status;
    this.currentTurnPlayerId = currentTurnPlayerId;
  }

  public addPlayer(player: PlayerEntity): void {
    if (this.players.length >= 2) {
      throw new Error("Battle already has 2 players.");
    }
    this.players.push(player);
    if (this.players.length === 2) {
      this.status = "ready";
    }
  }

  public setReady(playerNickname: string): void {
    const player = this.players.find((p) => p.nickname === playerNickname);
    if (player) {
      player.isReady = true;
    }
    if (this.players.length === 2 && this.players.every((p) => p.isReady)) {
      this.startBattle();
    }
  }

  private startBattle(): void {
    this.status = "battling";
    this.determineInitiative();
  }

  private determineInitiative(): void {
    const [player1, player2] = this.players;
    const p1Speed = player1.activePokemon?.speed || 0;
    const p2Speed = player2.activePokemon?.speed || 0;

    if (p1Speed >= p2Speed) {
      this.currentTurnPlayerId = player1.nickname;
    } else {
      this.currentTurnPlayerId = player2.nickname;
    }
  }

  public executeAttack(attackerNickname: string): void {
    if (this.status !== "battling") {
      throw new Error("Battle is not in progress.");
    }
    if (this.currentTurnPlayerId !== attackerNickname) {
      throw new Error("It's not this player's turn.");
    }

    const attacker = this.players.find((p) => p.nickname === attackerNickname);
    const defender = this.players.find((p) => p.nickname !== attackerNickname);

    if (!attacker || !defender) return;

    const attackerPokemon = attacker.activePokemon;
    const defenderPokemon = defender.activePokemon;

    if (!attackerPokemon || !defenderPokemon) return;

    // Regla de Negocio: Fórmula de Daño
    let damage = attackerPokemon.attack - defenderPokemon.defense;
    if (damage < 1) {
      damage = 1; // El daño mínimo siempre es 1
    }

    defenderPokemon.applyDamage(damage);

    // Regla de Negocio: Derrota
    if (defenderPokemon.isDefeated) {
      // El siguiente disponible entra automáticamente al usar get activePokemon() en los siguientes turnos
      if (!defender.hasAvailablePokemon) {
        this.status = "finished";
        return;
      }
    }

    // Pasar turno al otro jugador
    this.currentTurnPlayerId = defender.nickname;
  }
}
