import { Server as SocketIOServer } from "socket.io";
import { BattleEntity } from "@/domain/entities/Battle.entity";
import { IBattleNotifier } from "@/domain/ports/IBattleNotifier.port";
import { SocketServer } from "@/infrastructure/servers/Socket.server";
import { LOBBY_ID } from "@/shared/constants/battle.constants";

export class SocketBattleNotifier implements IBattleNotifier {
  constructor(private readonly socketServer: SocketServer) {}

  private get io(): SocketIOServer | undefined {
    return this.socketServer.getIO();
  }

  public notifyLobbyStatus(battle: BattleEntity): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit("lobby_status", battle);
  }

  public notifyBattleStart(battle: BattleEntity): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit("battle_start", battle);
  }

  public notifyTurnResult(battle: BattleEntity, damageDealt?: number): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit("turn_result", { battle, damageDealt });
  }

  public notifyBattleEnd(battle: BattleEntity): void {
    if (!this.io) return;
    this.io.to(LOBBY_ID).emit("battle_end", battle);
  }
}
