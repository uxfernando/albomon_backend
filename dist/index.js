"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressServer_1 = require("./presentation/server/ExpressServer");
const mongodb_1 = require("./infrastructure/database/mongodb");
const envs_1 = require("./config/envs");
const routes_1 = require("./presentation/routes");
const main = async () => {
    const PORT = envs_1.envs.PORT;
    const database = new mongodb_1.MongoDatabase();
    await database.connect();
    const server = new ExpressServer_1.ExpressServer({
        port: PORT,
        routes: routes_1.AppRoutes.routes,
    });
    server.start();
};
main();
