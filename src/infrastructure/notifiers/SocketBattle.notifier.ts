import { Server as SocketIOServer } from "socket.io";
import { BattleEntity } from "@/domain/entities/Battle.entity";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { SocketServer } from "@/infrastructure/servers/Socket.server";
import { LOBBY_ID } from "@/shared/constants/battle.constants";
import { NotifierEvent } from "@/shared/enums/Notifier.enum";

export class SocketBattleNotifier implements IBattleNotifier {
  constructor(private readonly socketServer: SocketServer) {}

  private get io(): SocketIOServer | undefined {
    return this.socketServer.getIO();
  }

  public notifyLobbyStatus(battle: BattleEntity): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit(NotifierEvent.LOBBY_STATUS, battle);
  }

  public notifyBattleStart(battle: BattleEntity): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit(NotifierEvent.BATTLE_START, battle);
  }

  public notifyTurnResult(battle: BattleEntity, damageDealt?: number): void {
    if (!this.io) return;
    this.io
      .to(LOBBY_ID)
      .emit(NotifierEvent.TURN_RESULT, { battle, damageDealt });
  }

  public notifyBattleEnd(battle: BattleEntity): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit(NotifierEvent.BATTLE_END, battle);
  }
}
