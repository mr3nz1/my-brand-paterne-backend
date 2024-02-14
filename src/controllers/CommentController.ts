import { NextFunction, Request, Response } from "express";
import createCommentSchema from "../validation/CommentValidation";
import CommentModel from "../models/CommentModel";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";
import ArticleModel from "../models/ArticleModel";

class CommentController {
  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentData = await createCommentSchema.validateAsync(req.body);

      const comment = await CommentModel.create({ ...commentData });
      comment.save();

      return res.status(StatusCodes.CREATED).json({
        msg: "Succesfully Created",
      });
    } catch (err) {
      next(err);
    }
  }

  public async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await CommentModel.find({});

      // ensure that one can filter out what they want

      res.status(StatusCodes.OK).json({
        msg: "Success",
        comments,
      });
    } catch (err) {
      next(err);
    }
  }

  public deleteComment() {}
}

export default new CommentController();
