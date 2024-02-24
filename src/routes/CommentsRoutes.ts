import { Router } from "express";
import CommentController from "../controllers/CommentController";
import asyncHandler from "../middlewares/asyncHandler";
import auth from "../middlewares/auth";

const router: Router = Router();

router.route("/").post(asyncHandler(CommentController.createComment));
router.route("/:articleId").get(asyncHandler(CommentController.getComments));
router
  .route("/:commentId")
  .delete(asyncHandler(auth), asyncHandler(CommentController.deleteComment));

export default router;
