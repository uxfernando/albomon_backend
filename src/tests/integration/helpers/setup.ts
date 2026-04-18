import { BattleEntity } from "@/domain/entities/Battle.entity";
import { PlayerEntity } from "@/domain/entities/Player.entity";
import { PokemonEntity } from "@/domain/entities/Pokemon.entity";
import { PlayerReadyUseCase } from "@/application/use-cases/lobby/PlayerReady.usecase";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { LOBBY_ID } from "@/shared/constants/battle.constants";

export const PLAYER_1 = "Ash";
export const PLAYER_2 = "Gary";

export const setupReadyBattle = async (
  battleRepo: IBattleRepository,
  playerReadyUseCase: PlayerReadyUseCase,
  player1Pokemons: PokemonEntity[],
  player2Pokemons: PokemonEntity[],
) => {
  const battle = new BattleEntity(LOBBY_ID);
  battle.addPlayer(new PlayerEntity(PLAYER_1, player1Pokemons));
  battle.addPlayer(new PlayerEntity(PLAYER_2, player2Pokemons));
  await battleRepo.save(battle);

  await playerReadyUseCase.execute({ nickname: PLAYER_1 });
  await playerReadyUseCase.execute({ nickname: PLAYER_2 });

  return (await battleRepo.findById(LOBBY_ID)) as BattleEntity;
};
