import { NextFunction, Request, Response } from "express";
import {
  createArticleSchema,
  updateArticleSchema,
} from "../validation/ArticleValidation";
import CustomError from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import ArticleModel from "../models/ArticleModel";
import fs from "fs/promises";
import CommentModel from "../models/CommentModel";

class ArticleController {
  public async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const value = await createArticleSchema.validateAsync({
        ...req.body,
        bannerImage: req.file,
      });
    } catch (err) {
      await fs.unlink("./uploads/" + req.file?.filename);
    }
    
    const article = await ArticleModel.create({
      ...req.body,
      bannerImageUrl: req.file?.filename,
    });

    await article.save();

    return res.status(StatusCodes.CREATED).json({
      status: "success",
      data: {
        article: {
          id: article._id,
          title: article.title,
          description: article.description,
          content: article.content,
          bannerImage: article.bannerImageUrl,
        },
      },
    });
  }

  public async getArticles(req: Request, res: Response, next: NextFunction) {
    const articles = await ArticleModel.find({}).select(
      "_id, title description content bannerImageUrl isPublished"
    );
    return res.status(StatusCodes.OK).json({
      status: "success",
      data: { articles },
    });
  }

  public async getArticle(req: Request, res: Response, next: NextFunction) {
    const articleId = req.params.id;

    // if (!articleId)
    //   throw new CustomError(
    //     "Please provide an article",
    //     StatusCodes.BAD_REQUEST
    //   );

    const article = await ArticleModel.findById(articleId).select(
      "_id, title description content bannerImageUrl"
    );

    if (!article)
      throw new CustomError(
        "No article of Id: " + articleId,
        StatusCodes.NOT_FOUND
      );

    return res.status(StatusCodes.OK).json({
      status: "success",
      data: { article },
    });
  }

  public async deleteArticle(req: Request, res: Response, next: NextFunction) {
    const articleId = req.params.id;

    // if (!articleId)
    //   throw new CustomError(
    //     "Please provide an article",
    //     StatusCodes.BAD_REQUEST
    //   );

    const article = await ArticleModel.findByIdAndDelete(articleId);
    await CommentModel.deleteMany({ articleId });

    await fs.unlink("./uploads/" + article?.bannerImageUrl);

    if (!article)
      throw new CustomError(
        "No article of Id: " + articleId,
        StatusCodes.NOT_FOUND
      );

    return res.status(StatusCodes.OK).json({
      status: "success deleting article with id: " + articleId,
      data: null,
    });
  }

  public async updateArticle(req: Request, res: Response, next: NextFunction) {
    const articleId = req.params.id;

    // if (!articleId)
    //   throw new CustomError(
    //     "Please provide an article",
    //     StatusCodes.BAD_REQUEST
    //   );

    const value = await updateArticleSchema.validateAsync(req.body);

    const article = await ArticleModel.findById(articleId);

    if (!article)
      throw new CustomError(
        "Can't find article with ID: " + articleId,
        StatusCodes.NOT_FOUND
      );

    if (req.file) {
      await fs.unlink("./uploads/" + article?.bannerImageUrl);

      await article?.updateOne({
        ...req.body,
        bannerImageUrl: req.file.filename,
      });
    } else {
      await article?.updateOne({ ...req.body });
    }

    await article?.save();

    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        article: {
          _id: article._id,
          title: article.title,
          description: article.description,
          content: article.content,
          bannerImage: article.bannerImageUrl,
        },
      },
    });
  }
}

export default new ArticleController();
