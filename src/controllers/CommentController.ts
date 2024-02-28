import { NextFunction, Request, Response } from "express";
import createCommentSchema from "../validation/CommentValidation";
import CommentModel from "../models/CommentModel";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";
import ArticleModel from "../models/ArticleModel";

class CommentController {
  public async createComment(req: Request, res: Response, next: NextFunction) {
    const commentData = await createCommentSchema.validateAsync(req.body);

    const article = await ArticleModel.findById(commentData.articleId);

    if (!article)
      throw new CustomError(
        "No article of Id: " +
          commentData.articleId +
          ". You can not add a comment to an unexistent article.",
        StatusCodes.NOT_FOUND
      );

    const comment = await CommentModel.create({ ...commentData });
    comment.save();

    return res.status(StatusCodes.CREATED).json({
      status: "success",
      data: {
        comment: {
          id: comment._id,
          name: comment.name,
          email: comment.email,
          createdAt: comment.createdAt,
        },
      },
    });
  }

  public async getComments(req: Request, res: Response, next: NextFunction) {
    const articleId = req.params.articleId;

    // if (!articleId)
    //   throw new CustomError("Article Id is required", StatusCodes.BAD_REQUEST);

    const comments = await CommentModel.find({ articleId });

    res.status(StatusCodes.OK).json({
      status: "success",
      data: { comments },
    });
  }

  public async deleteComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.commentId;

    // if (!commentId)
    //   throw new CustomError("Comment Id is required", StatusCodes.BAD_REQUEST);

    const comment = await CommentModel.findById(commentId);

    if (!comment)
      throw new CustomError(
        "There is not comment with Id: " + commentId,
        StatusCodes.NOT_FOUND
      );

    comment.deleteOne();

    res.status(StatusCodes.OK).json({
      status: "success",
      data: null,
    });
  }
}

export default new CommentController();
