import { ExpressServer } from "@/infrastructure/servers/Express.server";
import { SocketServer } from "@/infrastructure/servers/Socket.server";
import { MongoDatabase } from "@/infrastructure/database/mongodb";

import { envs } from "@/config/envs";
import { AppRoutes } from "@/presentation/routes";

const main = async () => {
  const PORT = envs.PORT;

  const database = new MongoDatabase();
  await database.connect();

  const server = new ExpressServer({
    port: PORT,
    routes: AppRoutes.routes,
  });

  const socketServer = SocketServer.getInstance();
  socketServer.init(server.getServer());

  server.start();
};

main();
