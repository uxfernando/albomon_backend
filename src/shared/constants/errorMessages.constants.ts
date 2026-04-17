export const ErrorMessages = {
  BATTLE_NOT_FOUND: "Battle not found.",
  BATTLE_FULL: "Battle already has 2 players.",
  PLAYER_ALREADY_IN_BATTLE: (nickname: string) => `Player with nickname '${nickname}' is already in the battle.`,
  PLAYER_NOT_FOUND: (nickname: string) => `Player with nickname '${nickname}' not found in the battle.`,
  PLAYER_NO_TEAM: "Player has no Pokemon team assigned.",
  PLAYER_ALREADY_HAS_TEAM: "Player already has a Pokemon team assigned.",
  PLAYER_ALREADY_READY: "Player is already ready.",
  PLAYER_MAX_POKEMONS: "A player can have a maximum of 3 Pokemons.",
  BATTLE_NOT_READY: "Battle is not ready to start.",
  BATTLE_NOT_IN_PROGRESS: "Battle is not in progress.",
  NOT_PLAYER_TURN: "It's not this player's turn.",
} as const;
