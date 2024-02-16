import { Router } from "express";
import TaskController from "../controllers/TaskController";
import auth from "../middlewares/auth";
import asyncHandler from "../middlewares/asyncHandler";

const router: Router = Router();

router
  .route("/")
  .get(asyncHandler(auth), asyncHandler(TaskController.getTasks))
  .post(asyncHandler(auth), asyncHandler(TaskController.createTask));

router
  .route("/:id")
  .delete(asyncHandler(auth), asyncHandler(TaskController.deleteTask))
  .patch(asyncHandler(auth), asyncHandler(TaskController.updateTask));

export default router;
