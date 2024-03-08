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
import cloudinary from "../utils/cloudinaryConfig";

class ArticleController {
  public async createArticle(req: Request, res: Response, next: NextFunction) {
    if (!req.file)
      throw new CustomError("Please upload the Image", StatusCodes.BAD_REQUEST);
    try {
      const value = await createArticleSchema.validateAsync({
        ...req.body,
        bannerImage: req.file,
      });
    } catch (err) {
      // await fs.unlink("./tmp/uploads/" + req.file?.filename);
    }
    console.log(process.env.CLOUDINARY_API_KEY);

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });

    const article = await ArticleModel.create({
      ...req.body,
      bannerImageUrl: uploadedImage.secure_url,
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
    const articles = await ArticleModel.find({})
      .select(
        "_id title description content bannerImageUrl isPublished createdAt"
      )
      .sort({ createdAt: -1 });
    const transformedArticles = articles.map((article) => {
      return {
        id: article._id,
        title: article.title,
        description: article.description,
        content: article.content,
        bannerImageUrl: article.bannerImageUrl,
        isPublished: article.isPublished,
        createdAt: article.createdAt,
      };
    });

    return res.status(StatusCodes.OK).json({
      status: "success",
      data: { articles: transformedArticles },
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
      data: {
        article: {
          id: article._id,
          title: article.title,
          description: article.title,
          content: article.content,
          bannerImageUrl: article.bannerImageUrl,
          isPublished: article.isPublished,
          createdAt: article.createdAt,
        },
      },
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

    const fileNameArr = article?.bannerImageUrl.split("/");
    const fileName = fileNameArr![fileNameArr!.length - 1];

    const status = await cloudinary.api.delete_resources(
      [`images/${fileName.split(".")[0]}`],
      { type: "upload", resource_type: "image" }
    );

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
      // await fs.unlink("./uploads/" + article?.bannerImageUrl);
      const fileNameArr = article?.bannerImageUrl.split("/");
      const fileName = fileNameArr![fileNameArr!.length - 1];

      const status = await cloudinary.api.delete_resources(
        [`images/${fileName.split(".")[0]}`],
        { type: "upload", resource_type: "image" }
      );

      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "images",
      });

      await article?.updateOne({
        ...req.body,
        bannerImageUrl: uploadedImage.secure_url,
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
