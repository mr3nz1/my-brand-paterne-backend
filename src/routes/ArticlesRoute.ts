import { Router } from "express";
import ArticleController from "../controllers/ArticleController";
import fileUpload from "../utils/fileUpload";
import auth from "../middlewares/auth";

const router: Router = Router();

router
  .route("/")
  .get(auth, ArticleController.getArticles)
  .post(
    auth,
    fileUpload.single("bannerImage"),
    ArticleController.createArticle
  );

router
  .route("/:id")
  .get(auth, ArticleController.getArticle)
  .patch(
    auth,
    fileUpload.single("bannerImage"),
    ArticleController.updateArticle
  )
  .delete(auth, ArticleController.deleteArticle);

export default router;
