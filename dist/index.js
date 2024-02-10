"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
class Server {
    constructor() {
        this.init();
        this.useMiddleWares();
        this.addRoutes();
        this.listenServer();
    }
    init() {
        dotenv_1.default.config();
    }
    useMiddleWares() {
        app.use(express_1.default.json());
    }
    addRoutes() {
        app.use("/", (req, res) => {
            res.send("Typescript Classes Express Project");
        });
    }
    listenServer() {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("Server Listening on port " + port);
        });
    }
}
new Server();
