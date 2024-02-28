import { Request, Response, NextFunction } from "express";
import {
  createTaskUserSchema,
  updateTaskUserSchema,
} from "../validation/TaskValidation";
import TaskModel from "../models/TaskModel";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";
import { updateArticleSchema } from "../validation/ArticleValidation";

class TaskController {
  public async createTask(req: Request, res: Response, next: NextFunction) {
    const taskData = await createTaskUserSchema.validateAsync(req.body);

    const task = await TaskModel.create({ ...taskData });

    await task.save();
    return res.status(StatusCodes.CREATED).json({
      status: "success",
      data: {
        task: {
          id: task._id,
          title: task.title,
          content: task.content,
          createdAt: task.content,
        },
      },
    });
  }

  public async getTasks(req: Request, res: Response, next: NextFunction) {
    const tasks = await TaskModel.find({});

    res.status(StatusCodes.OK).json({
      status: "success",
      data: { tasks },
    });
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;

    // if (!taskId)
    //   throw new CustomError("Task Id is required", StatusCodes.BAD_REQUEST);

    const task = await TaskModel.findByIdAndDelete(taskId);

    if (!task)
      throw new CustomError(
        "No task with Id: " + taskId,
        StatusCodes.NOT_FOUND
      );

    return res.status(StatusCodes.OK).json({ message: "success", data: null });
  }

  public async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;

      // if (!taskId)
      //   throw new CustomError("Task Id is Required", StatusCodes.NOT_FOUND);

      const taskData = await updateTaskUserSchema.validateAsync(req.body);

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

      return res.status(StatusCodes.OK).json({
        message: "success",
        data: { task },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TaskController();
