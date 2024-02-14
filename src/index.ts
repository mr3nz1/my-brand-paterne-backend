import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();

// routes
import users from "./routes/UserRoute";
import articles from "./routes/ArticlesRoute";
import tasks from "./routes/TaskRoute";
import comments from "./routes/CommentRoute";
import messages from "./routes/MessageRoute";
import errorHandler from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectDB from "./db/connectDB";
import { StatusCodes } from "http-status-codes";

class Server {
  constructor() {
    this.init();
    this.DB();
    this.listenServer();
  }

  init() {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    dotenv.config();

    app.get("/", (req: Request, res: Response) => {
      res.send("Typescript Classes Express Project");
    });
    app.use("/api/v1/users", users);
    app.use("/api/v1/articles", articles);
    app.use("/api/v1/comments", comments);
    app.use("/api/v1/messages", messages);
    app.use("/api/v1/tasks", tasks);
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
