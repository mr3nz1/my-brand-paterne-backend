import { Router } from "express";
import ArticleController from "../controllers/ArticleController";
import fileUpload from "../utils/fileUpload";
import auth from "../middlewares/auth";
import asyncHandler from "../middlewares/asyncHandler";

const router: Router = Router();

router
  .route("/")
  .get(asyncHandler(auth), asyncHandler(ArticleController.getArticles))
  .post(
    asyncHandler(auth),
    fileUpload.single("bannerImage"),
    asyncHandler(ArticleController.createArticle)
  );

router
  .route("/:id")
  .get(asyncHandler(auth), asyncHandler(ArticleController.getArticle))
  .patch(
    asyncHandler(auth),
    fileUpload.single("bannerImage"),
    asyncHandler(ArticleController.updateArticle)
  )
  .delete(asyncHandler(auth), asyncHandler(ArticleController.deleteArticle));

export default router;
