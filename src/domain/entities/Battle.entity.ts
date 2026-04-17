import { BattleStatus } from "../../shared/enums/Battle.enum";
import { PlayerEntity } from "./Player.entity";
import { DomainError } from "../../shared/errors/AppError";
import { ErrorMessages } from "../../shared/constants/errorMessages.constants";

export class BattleEntity {
  public readonly id: string;
  public players: PlayerEntity[];
  public status: BattleStatus;
  public currentTurnPlayerId: string | null;
  public winnerId: string | null;

  constructor(
    id: string,
    players: PlayerEntity[] = [],
    status: BattleStatus = BattleStatus.Waiting,
    currentTurnPlayerId: string | null = null,
    winnerId: string | null = null,
  ) {
    this.id = id;
    this.players = players;
    this.status = status;
    this.currentTurnPlayerId = currentTurnPlayerId;
    this.winnerId = winnerId;
  }

  public addPlayer(player: PlayerEntity): void {
    if (this.players.length >= 2) {
      throw new DomainError(ErrorMessages.BATTLE_FULL);
    }

    const nicknameExists = this.players.some(
      (p) => p.nickname === player.nickname,
    );

    if (nicknameExists) {
      throw new DomainError(
        ErrorMessages.PLAYER_ALREADY_IN_BATTLE(player.nickname),
      );
    }

    this.players.push(player);
  }

  public setReady(playerNickname: string): void {
    const player = this.players.find((p) => p.nickname === playerNickname);
    if (!player) {
      throw new DomainError(ErrorMessages.PLAYER_NOT_FOUND(playerNickname));
    }

    if (player.pokemonTeam.length === 0) {
      throw new DomainError(ErrorMessages.PLAYER_NO_TEAM);
    }

    if (player.isReady) {
      throw new DomainError(ErrorMessages.PLAYER_ALREADY_READY);
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
      throw new DomainError(ErrorMessages.BATTLE_NOT_READY);
    }
    this.status = BattleStatus.Battling;
  }

  public executeAttack(attackerNickname: string): number {
    if (this.status === BattleStatus.Ready) {
      this.startBattle();
    }

    if (this.status === BattleStatus.Finished) {
      throw new DomainError(ErrorMessages.BATTLE_FINISHED);
    }

    if (this.status !== BattleStatus.Battling) {
      throw new DomainError(ErrorMessages.BATTLE_NOT_IN_PROGRESS);
    }

    if (this.currentTurnPlayerId !== attackerNickname) {
      throw new DomainError(ErrorMessages.NOT_PLAYER_TURN);
    }

    const attacker = this.players.find((p) => p.nickname === attackerNickname);
    const defender = this.players.find((p) => p.nickname !== attackerNickname);

    if (!attacker || !defender) return 0;

    const attackerPokemon = attacker.activePokemon;
    const defenderPokemon = defender.activePokemon;

    if (!attackerPokemon || !defenderPokemon) return 0;

    // Regla de Negocio: Fórmula de Daño
    let damage = attackerPokemon.attack - defenderPokemon.defense;
    if (damage < 1) {
      damage = 1; // El daño mínimo siempre es 1
    }

    const damageDealt = defenderPokemon.applyDamage(damage);

    // Regla de Negocio: Derrota
    if (defenderPokemon.isDefeated) {
      // El siguiente disponible entra automáticamente al usar get activePokemon() en los siguientes turnos
      if (!defender.hasAvailablePokemon) {
        this.status = BattleStatus.Finished;
        this.winnerId = attacker.nickname;
        return damageDealt;
      }
    }

    // Pasar turno al otro jugador
    this.currentTurnPlayerId = defender.nickname;
    
    return damageDealt;
  }
}
