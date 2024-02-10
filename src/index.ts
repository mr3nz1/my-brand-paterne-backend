import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();

class Server {
  constructor() {
    this.init();
    this.useMiddleWares();
    this.addRoutes();
    this.listenServer();
  }

  init() {
    dotenv.config();
  }

  useMiddleWares() {
    app.use(express.json());
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
