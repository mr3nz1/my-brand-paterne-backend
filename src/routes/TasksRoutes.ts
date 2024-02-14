import { Router } from "express";
import TaskController from "../controllers/TaskController";
import auth from "../middlewares/auth";

const router: Router = Router();

router
  .route("/")
  .get(auth, TaskController.getTasks)
  .post(auth, TaskController.createTask);

router
  .route("/:id")
  .delete(auth, TaskController.deleteTask)
  .patch(auth, TaskController.updateTask);

export default router;
