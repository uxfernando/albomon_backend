import { BattleEntity } from "@/domain/entities/Battle.entity";
import { PlayerEntity } from "@/domain/entities/Player.entity";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { JoinLobbyDto } from "@/application/dtos/lobby/JoinLobby.dto";

export class JoinLobbyUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute(dto: JoinLobbyDto) {
    // 1. Intentar buscar un lobby existente
    let battle = await this.battleRepository.findById(LOBBY_ID);

    // 2. Si no existe, lo creamos
    if (!battle) {
      battle = new BattleEntity(LOBBY_ID);
    }

    // 3. Crear el jugador sin pokemons asignados inicialmente
    const newPlayer = new PlayerEntity(dto.nickname, []);
    battle.addPlayer(newPlayer);

    // 4. Guardamos el estado actualizado en la base de datos
    await this.battleRepository.save(battle);

    return battle;
  }
}
