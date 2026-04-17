import { BattleStatus } from "../../shared/enums/Battle.enum";
import { PlayerEntity } from "./Player.entity";
import { DomainError } from "../../shared/errors/AppError";

export class BattleEntity {
  public readonly id: string;
  public players: PlayerEntity[];
  public status: BattleStatus;
  public currentTurnPlayerId: string | null;

  constructor(
    id: string,
    players: PlayerEntity[] = [],
    status: BattleStatus = BattleStatus.Waiting,
    currentTurnPlayerId: string | null = null,
  ) {
    this.id = id;
    this.players = players;
    this.status = status;
    this.currentTurnPlayerId = currentTurnPlayerId;
  }

  public addPlayer(player: PlayerEntity): void {
    if (this.players.length >= 2) {
      throw new DomainError("Battle already has 2 players.");
    }

    const nicknameExists = this.players.some(
      (p) => p.nickname === player.nickname,
    );

    if (nicknameExists) {
      throw new DomainError(
        `Player with nickname '${player.nickname}' is already in the battle.`,
      );
    }

    this.players.push(player);
  }

  public setReady(playerNickname: string): void {
    const player = this.players.find((p) => p.nickname === playerNickname);
    if (!player) {
      throw new DomainError(
        `Player with nickname '${playerNickname}' not found in the battle.`,
      );
    }

    if (player.pokemonTeam.length === 0) {
      throw new DomainError("Player has no Pokemon team assigned.");
    }

    if (player.isReady) {
      throw new DomainError("Player is already ready.");
    }

    player.isReady = true;

    if (this.players.length === 2 && this.players.every((p) => p.isReady)) {
      this.status = BattleStatus.Ready;
      this.determineInitiative();
    }
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

  public startBattle(): void {
    if (this.status !== BattleStatus.Ready) {
      throw new DomainError("Battle is not ready to start.");
    }
    this.status = BattleStatus.Battling;
  }

  public executeAttack(attackerNickname: string): void {
    if (this.status !== "battling") {
      throw new DomainError("Battle is not in progress.");
    }
    if (this.currentTurnPlayerId !== attackerNickname) {
      throw new DomainError("It's not this player's turn.");
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
        this.status = BattleStatus.Finished;
        return;
      }
    }

    // Pasar turno al otro jugador
    this.currentTurnPlayerId = defender.nickname;
  }
}
