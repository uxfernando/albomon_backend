import { IBattleRepository } from "../../domain/repositories/IBattle.repository";
import { DomainError } from "../../shared/errors/AppError";

export class PlayerReadyUseCase {
  constructor(private battleRepository: IBattleRepository) {}

  async execute(nickname: string) {
    const LOBBY_ID = "unique-stadium-lobby";
    const battle = await this.battleRepository.findById(LOBBY_ID);

    if (!battle) {
      throw new DomainError("Battle not found.");
    }

    battle.setReady(nickname);

    await this.battleRepository.save(battle);

    return battle;
  }
}
