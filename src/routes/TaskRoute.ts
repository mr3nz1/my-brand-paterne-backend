import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router: Router = Router();

router
  .route("/")
  .get(TaskController.getTasks)
  .post(TaskController.createTask);

router
  .route("/:id")
  .get(TaskController.getTask)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);

export default router;
