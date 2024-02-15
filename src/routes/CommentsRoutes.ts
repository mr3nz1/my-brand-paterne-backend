import { Router } from "express";
import CommentController from "../controllers/CommentController";

const router: Router = Router();

router.route("/").post(CommentController.createComment);
router.route("/:authorId").get(CommentController.getComments);
router.route("/:id").delete(CommentController.deleteComment);

export default router;
