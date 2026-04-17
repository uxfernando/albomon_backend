import { ExpressServer } from "./presentation/server/ExpressServer";
import { MongoDatabase } from "./infrastructure/database/mongodb";

import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";

const main = async () => {
  const PORT = envs.PORT;

  const database = new MongoDatabase();
  await database.connect();

  const server = new ExpressServer({
    port: PORT,
    routes: AppRoutes.routes,
  });
  server.start();
};

main();
