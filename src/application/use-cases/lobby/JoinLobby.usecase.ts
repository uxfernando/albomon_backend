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

    const newPlayer = new PlayerEntity(dto.nickname, []);
    battle.addPlayer(newPlayer);

    await this.battleRepository.save(battle);

    this.notifier.notifyLobbyStatus(battle);

    return battle;
  }
}
