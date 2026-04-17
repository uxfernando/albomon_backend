"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = require("./infrastructure/app");
const mongo_1 = require("./infrastructure/database/mongo");
const MongoBattleRepository_1 = require("./infrastructure/repositories/MongoBattleRepository");
const AxiosPokemonRepository_1 = require("./infrastructure/repositories/AxiosPokemonRepository");
const SocketHandler_1 = require("./presentation/SocketHandler");
const PORT = Number(process.env.PORT) || 8080;
const main = async () => {
    await (0, mongo_1.connectDB)();
    const server = http_1.default.createServer(app_1.app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const battleRepository = new MongoBattleRepository_1.MongoBattleRepository();
    const pokemonRepository = new AxiosPokemonRepository_1.AxiosPokemonRepository();
    const socketHandler = new SocketHandler_1.SocketHandler(io, battleRepository, pokemonRepository);
    io.on("connection", (socket) => {
        socketHandler.handleConnection(socket);
    });
    server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });
};
main();
