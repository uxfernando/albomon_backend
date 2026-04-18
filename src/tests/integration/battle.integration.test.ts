import { describe, it, expect, beforeEach } from "vitest";
import { BattleEntity } from "@/domain/entities/Battle.entity";
import { PlayerEntity } from "@/domain/entities/Player.entity";
import { AttackUseCase } from "@/application/use-cases/battle/Attack.usecase";
import { PlayerReadyUseCase } from "@/application/use-cases/lobby/PlayerReady.usecase";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { BattleStatus } from "@/shared/enums/Battle.enum";
import { DomainError } from "@/shared/errors/AppError";
import {
  MockBattleRepository,
  MockBattleNotifier,
  createMockPokemon,
} from "./helpers/mocks";
import { setupReadyBattle, PLAYER_1, PLAYER_2 } from "./helpers/setup";

describe("Battle Integration Suite", () => {
  let battleRepo: MockBattleRepository;
  let notifier: MockBattleNotifier;
  let attackUseCase: AttackUseCase;
  let playerReadyUseCase: PlayerReadyUseCase;

  beforeEach(() => {
    battleRepo = new MockBattleRepository();
    notifier = new MockBattleNotifier();
    attackUseCase = new AttackUseCase(battleRepo, notifier);
    playerReadyUseCase = new PlayerReadyUseCase(battleRepo, notifier);
  });

  it("1. Full Flow Test (Happy Path): Simulates a battle from start to finish until one player wins and verifies turns", async () => {
    // Business Rule: The battle must flow by alternating turns until all pokemons of a player are defeated.
    const ashPokemon = createMockPokemon(1, "Pikachu", 20, 10, 5, 100);
    const garyPokemon = createMockPokemon(2, "Eevee", 20, 8, 5, 90);

    let battle = await setupReadyBattle(
      battleRepo,
      playerReadyUseCase,
      [ashPokemon],
      [garyPokemon],
    );

    expect(battle.currentTurnPlayerId).toBe(PLAYER_1);

    await attackUseCase.execute({ nickname: PLAYER_1 });
    expect(battle.currentTurnPlayerId).toBe(PLAYER_2);
    expect(garyPokemon.currentHp).toBe(15); // 10 attack - 5 defense = 5 damage

    await attackUseCase.execute({ nickname: PLAYER_2 });
    expect(battle.currentTurnPlayerId).toBe(PLAYER_1);
    expect(ashPokemon.currentHp).toBe(17); // 8 attack - 5 defense = 3 damage

    await attackUseCase.execute({ nickname: PLAYER_1 });
    expect(battle.currentTurnPlayerId).toBe(PLAYER_2);
    expect(garyPokemon.currentHp).toBe(10);

    await attackUseCase.execute({ nickname: PLAYER_2 });
    expect(battle.currentTurnPlayerId).toBe(PLAYER_1);
    expect(ashPokemon.currentHp).toBe(14);

    await attackUseCase.execute({ nickname: PLAYER_1 });
    expect(battle.currentTurnPlayerId).toBe(PLAYER_2);
    expect(garyPokemon.currentHp).toBe(5);

    await attackUseCase.execute({ nickname: PLAYER_2 });
    expect(battle.currentTurnPlayerId).toBe(PLAYER_1);
    expect(ashPokemon.currentHp).toBe(11);

    const result = await attackUseCase.execute({ nickname: PLAYER_1 });
    battle = result.battle;

    expect(garyPokemon.isDefeated).toBe(true);
    expect(battle.winnerId).toBe(PLAYER_1);
    expect(battle.status).toBe(BattleStatus.Finished);
  });

  it("2. Math Validation: Attack - Defense <= 0 results in 1 damage", async () => {
    // Business Rule: Minimum damage dealt is always 1, even if defense exceeds attack.
    const weakPokemon = createMockPokemon(1, "Magikarp", 20, 2, 5, 100);
    const tankPokemon = createMockPokemon(2, "Onix", 20, 10, 20, 50);

    await setupReadyBattle(
      battleRepo,
      playerReadyUseCase,
      [weakPokemon],
      [tankPokemon],
    );

    await attackUseCase.execute({ nickname: PLAYER_1 });

    expect(tankPokemon.currentHp).toBe(19);
  });

  it("3. Math Validation: Damage greater than remaining HP results in exactly 0 HP", async () => {
    // Business Rule: A Pokemon's HP cannot be negative, it must stop at 0.
    const strongPokemon = createMockPokemon(1, "Mewtwo", 50, 100, 50, 100);
    const frailPokemon = createMockPokemon(2, "Rattata", 10, 5, 5, 50);

    await setupReadyBattle(
      battleRepo,
      playerReadyUseCase,
      [strongPokemon],
      [frailPokemon],
    );

    await attackUseCase.execute({ nickname: PLAYER_1 });

    expect(frailPokemon.currentHp).toBe(0);
  });

  it("4. Automatic Switch Logic: Assigns the second Pokemon automatically", async () => {
    // Business Rule: When the active Pokemon is defeated, the next available Pokemon assumes the active role.
    const ashPokemon = createMockPokemon(1, "Pikachu", 50, 100, 50, 100);
    const garyFirstPokemon = createMockPokemon(2, "Rattata", 10, 5, 5, 50);
    const garySecondPokemon = createMockPokemon(3, "Pidgey", 20, 10, 5, 60);

    const battle = await setupReadyBattle(
      battleRepo,
      playerReadyUseCase,
      [ashPokemon],
      [garyFirstPokemon, garySecondPokemon],
    );

    await attackUseCase.execute({ nickname: PLAYER_1 });

    expect(garyFirstPokemon.isDefeated).toBe(true);
    expect(battle.status).not.toBe(BattleStatus.Finished); // Battle continues

    const gary = battle.players.find((p) => p.nickname === PLAYER_2);
    expect(gary?.activePokemon?.name).toBe("Pidgey");

    expect(battle.currentTurnPlayerId).toBe(PLAYER_2);
  });

  it("5. Initiative Test: Correctly assigns the first turn to the one with the highest speed", async () => {
    // Business Rule: When setting players as ready, initiative (first turn) is given to the player with the highest speed Pokemon.
    const slowPokemon = createMockPokemon(1, "Slowpoke", 50, 10, 10, 15);
    const fastPokemon = createMockPokemon(2, "Jolteon", 50, 10, 10, 130);

    const battle = await setupReadyBattle(
      battleRepo,
      playerReadyUseCase,
      [slowPokemon],
      [fastPokemon],
    );

    expect(battle.currentTurnPlayerId).toBe(PLAYER_2);
  });

  it("6. Turn Protection: Tries to execute two consecutive attacks and returns an error", async () => {
    // Business Rule: A player cannot attack if it's not their turn.
    const ashPokemon = createMockPokemon(1, "Pikachu", 50, 10, 5, 100);
    const garyPokemon = createMockPokemon(2, "Eevee", 50, 10, 5, 90);

    await setupReadyBattle(
      battleRepo,
      playerReadyUseCase,
      [ashPokemon],
      [garyPokemon],
    );

    await attackUseCase.execute({ nickname: PLAYER_1 });

    await expect(attackUseCase.execute({ nickname: PLAYER_1 })).rejects.toThrow(
      DomainError,
    );
  });

  it("7. Battle Status Lifecycle: Verifies that the battle transitions correctly from Waiting to Finished", async () => {
    // Business Rule: Battle status should change from Waiting -> Battling -> Finished
    const ashPokemon = createMockPokemon(1, "Pikachu", 20, 10, 5, 100);
    const garyPokemon = createMockPokemon(2, "Eevee", 20, 8, 5, 90);

    const battle = new BattleEntity(LOBBY_ID);
    expect(battle.status).toBe(BattleStatus.Waiting);

    battle.addPlayer(new PlayerEntity(PLAYER_1, [ashPokemon]));
    battle.addPlayer(new PlayerEntity(PLAYER_2, [garyPokemon]));
    await battleRepo.save(battle);

    await playerReadyUseCase.execute({ nickname: PLAYER_1 });
    let currentBattle = await battleRepo.findById(LOBBY_ID);
    expect(currentBattle?.status).toBe(BattleStatus.Waiting);

    // Both players ready, status should transition to Battling
    await playerReadyUseCase.execute({ nickname: PLAYER_2 });
    currentBattle = await battleRepo.findById(LOBBY_ID);
    expect(currentBattle?.status).toBe(BattleStatus.Battling);

    // Pikachu deals 5 damage per hit, Eevee has 20 HP. It takes 4 hits to kill Eevee.
    await attackUseCase.execute({ nickname: PLAYER_1 });
    await attackUseCase.execute({ nickname: PLAYER_2 });
    await attackUseCase.execute({ nickname: PLAYER_1 });
    await attackUseCase.execute({ nickname: PLAYER_2 });
    await attackUseCase.execute({ nickname: PLAYER_1 });
    await attackUseCase.execute({ nickname: PLAYER_2 });
    await attackUseCase.execute({ nickname: PLAYER_1 }); // Lethal attack

    currentBattle = await battleRepo.findById(LOBBY_ID);
    expect(currentBattle?.status).toBe(BattleStatus.Finished);
  });
});
