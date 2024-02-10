import { Router } from "express";
import ArticleController from "../controllers/ArticleController";

const router: Router = Router();

router
  .route("/")
  .get(ArticleController.getArticles)
  .post(ArticleController.createArticle);

router
  .route("/:id")
  .get(ArticleController.getArticle)
  .patch(ArticleController.updateArticle)
  .delete(ArticleController.deleteArticle);

export default router;
