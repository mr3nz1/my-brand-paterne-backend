import { Request, Response, NextFunction } from "express";
import {
  createTaskUserSchema,
  updateTaskUserSchema,
} from "../validation/TaskValidation";
import ArticleModel from "../models/ArticleModel";
import TaskModel from "../models/TaskModel";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";
import { updateArticleSchema } from "../validation/ArticleValidation";

class TaskController {
  public async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const taskData = await createTaskUserSchema.validateAsync(req.body);

      const task = await TaskModel.create({ ...taskData });

      await task.save();

      return res.status(StatusCodes.CREATED).json({
        msg: "Success",
      });
    } catch (err) {
      next(err);
    }
  }

  public async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskModel.find({});

      res.status(StatusCodes.OK).json({
        msg: "Success",
        tasks,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;

      if (!taskId)
        throw new CustomError("Task Id is required", StatusCodes.BAD_REQUEST);

      const task = await TaskModel.findByIdAndDelete(taskId);

      if (!task)
        throw new CustomError(
          "No task with Id: " + taskId,
          StatusCodes.NOT_FOUND
        );

      return res.status(StatusCodes.OK).json({ msg: "Successfuly deleted" });
    } catch (err) {
      next(err);
    }
  }

  public async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;

      if (!taskId)
        throw new CustomError("Task Id is Required", StatusCodes.NOT_FOUND);

      const taskData = await updateArticleSchema.validateAsync(req.body);

      const task = await TaskModel.findById(taskId);

      if (!task)
        throw new CustomError(
          "No task of Id: " + taskId,
          StatusCodes.NOT_FOUND
        );

      await task.updateOne(
        { ...taskData },
        {
          new: true,
        }
      );
      await task.save();

      console.log(task);
      console.log(taskData);

      return res.status(StatusCodes.OK).json({
        msg: "Successfully updated",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TaskController();
