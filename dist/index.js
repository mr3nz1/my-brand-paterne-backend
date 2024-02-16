"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
// routes
const UsersRoutes_1 = __importDefault(require("./routes/UsersRoutes"));
const ArticlesRoute_1 = __importDefault(require("./routes/ArticlesRoute"));
const MessagesRoutes_1 = __importDefault(require("./routes/MessagesRoutes"));
const TasksRoutes_1 = __importDefault(require("./routes/TasksRoutes"));
const CommentsRoutes_1 = __importDefault(require("./routes/CommentsRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const http_status_codes_1 = require("http-status-codes");
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor() {
        this.init();
        this.DB();
        this.listenServer();
    }
    init() {
        app.use(express_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use((0, morgan_1.default)("combined"));
        dotenv_1.default.config();
        app.get("/", (req, res) => {
            res.send("Typescript Classes Express Project");
        });
        app.use("/api/v1/users", UsersRoutes_1.default);
        app.use("/api/v1/articles", ArticlesRoute_1.default);
        app.use("/api/v1/messages", MessagesRoutes_1.default);
        app.use("/api/v1/tasks", TasksRoutes_1.default);
        app.use("/api/v1/comments", CommentsRoutes_1.default);
        app.all("*", (req, res) => {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: "Page not found" });
        });
        app.use(errorHandler_1.default);
    }
    DB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Connecting to DB");
                const DB_URI = process.env.MONGO_URI;
                yield (0, connectDB_1.default)(DB_URI);
                console.log("Connected");
            }
            catch (err) {
                console.log(err);
            }
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
