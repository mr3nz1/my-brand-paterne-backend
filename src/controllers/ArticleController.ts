import { NextFunction, Request, Response } from "express";
import {
  createArticleSchema,
  updateArticleSchema,
} from "../validation/ArticleValidation";
import CustomError from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import ArticleModel from "../models/ArticleModel";
import fs from "fs";

class ArticleController {
  public async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const value = await createArticleSchema.validateAsync(req.body);

      if (!req.file)
        throw new CustomError(
          "Banner Image is required",
          StatusCodes.BAD_REQUEST
        );

      const filename = req.file.filename;

      const article = new ArticleModel({
        ...req.body,
        bannerImageUrl: req.file.filename,
      });

      await article.save();

      return res.status(StatusCodes.CREATED).json({ msg: "Article created" });
    } catch (err) {
      return next(err);
    }
  }

  public async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await ArticleModel.find({}).select(
        "_id, title description content bannerImageUrl"
      );
      return res.status(StatusCodes.OK).json({
        msg: "Success",
        articles,
      });
    } catch (err) {
      return next(err);
    }
  }

  public async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = req.params.id;

      if (!articleId)
        throw new CustomError(
          "Please provide an article",
          StatusCodes.BAD_REQUEST
        );

      const article = await ArticleModel.findById(articleId).select(
        "_id, title description content bannerImageUrl"
      );

      if (!article)
        throw new CustomError(
          "No article of Id: " + articleId,
          StatusCodes.NOT_FOUND
        );

      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Success",
        article,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = req.params.id;

      if (!articleId)
        throw new CustomError(
          "Please provide an article",
          StatusCodes.BAD_REQUEST
        );

      const article = await ArticleModel.findByIdAndDelete(articleId);

      fs.unlink("./uploads/" + article?.bannerImageUrl, (err) => {
        if (err) {
          throw new CustomError(
            "Error while deleting image",
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
      });

      if (!article)
        throw new CustomError(
          "No article of Id: " + articleId,
          StatusCodes.NOT_FOUND
        );

      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Success deleting article with id: " + articleId,
      });
    } catch (err) {
      next(err);
    }
  }

  public async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId = req.params.id;

      if (!articleId)
        throw new CustomError(
          "Please provide an article",
          StatusCodes.BAD_REQUEST
        );

      const value = await updateArticleSchema.validateAsync(req.body);

      if (!req.file)
        throw new CustomError(
          "Banner Image is required",
          StatusCodes.BAD_REQUEST
        );
    } catch (err) {
      next(err);
    }
  }
}

export default new ArticleController();
