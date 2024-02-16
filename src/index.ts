import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();

// routes
import usersRoutes from "./routes/UsersRoutes";
import articlesRoutes from "./routes/ArticlesRoute";
import messagesRoutes from "./routes/MessagesRoutes";
import tasksRoutes from "./routes/TasksRoutes";
import commentsRoutes from "./routes/CommentsRoutes";
import errorHandler from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import connectDB from "./db/connectDB";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";

class Server {
  constructor() {
    this.init();
    this.DB();
    this.listenServer();
  }

  init() {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(morgan("combined"));

    dotenv.config();

    app.get("/", (req: Request, res: Response) => {
      res.send("Typescript Classes Express Project");
    });
    app.use("/api/v1/users", usersRoutes);
    app.use("/api/v1/articles", articlesRoutes);
    app.use("/api/v1/messages", messagesRoutes);
    app.use("/api/v1/tasks", tasksRoutes);
    app.use("/api/v1/comments", commentsRoutes);
    app.all("*", (req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Page not found" });
    });

    app.use(errorHandler);
  }

  async DB() {
    try {
      console.log("Connecting to DB");
      const DB_URI = process.env.MONGO_URI!;
      await connectDB(DB_URI);
      console.log("Connected");
    } catch (err) {
      console.log(err);
    }
  }

  listenServer() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Server Listening on port " + port);
    });
  }
}

new Server();
