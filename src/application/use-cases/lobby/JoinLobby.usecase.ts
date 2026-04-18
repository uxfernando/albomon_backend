import { BattleEntity } from "@/domain/entities/Battle.entity";
import { PlayerEntity } from "@/domain/entities/Player.entity";
import { IBattleRepository } from "@/domain/repositories/IBattle.repository";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { JoinLobbyDto } from "@/application/dtos/lobby/JoinLobby.dto";

export class JoinLobbyUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private notifier: IBattleNotifier,
  ) {}

  async execute(dto: JoinLobbyDto) {
    let battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      battle = new BattleEntity(LOBBY_ID);
    }

    // 3. Crear el jugador sin pokemons asignados inicialmente
    const newPlayer = new PlayerEntity(dto.nickname, []);
    battle.addPlayer(newPlayer);

    // 4. Guardamos el estado actualizado en la base de datos
    await this.battleRepository.save(battle);

    // 5. Notificar el estado del lobby
    this.notifier.notifyLobbyStatus(battle);

    return battle;
  }
}
