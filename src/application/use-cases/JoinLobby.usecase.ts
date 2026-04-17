import { BattleEntity } from "../../domain/entities/Battle.entity";
import { PlayerEntity } from "../../domain/entities/Player.entity";

import { IBattleRepository } from "../../domain/repositories/IBattle.repository";

export class JoinLobbyUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute(nickname: string) {
    // 1. Intentar buscar un lobby existente
    const LOBBY_ID = "unique-stadium-lobby";
    let battle = await this.battleRepository.findById(LOBBY_ID);

    // 2. Si no existe, lo creamos
    if (!battle) {
      battle = new BattleEntity(LOBBY_ID);
    }

    // 3. Crear el jugador sin pokemons asignados inicialmente
    const newPlayer = new PlayerEntity(nickname, []);
    battle.addPlayer(newPlayer);

    // 4. Guardamos el estado actualizado en la base de datos
    await this.battleRepository.save(battle);

    return battle;
  }
}
