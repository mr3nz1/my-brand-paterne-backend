import { Router } from "express";
import CommentController from "../controllers/CommentController";

const router: Router = Router();

router
  .route("/")
  .get(CommentController.getComments)
  .post(CommentController.createComment);

router.route("/:id").delete(CommentController.deleteComment);

export default router;
