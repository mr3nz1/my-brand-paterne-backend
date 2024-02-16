import { Router } from "express";
import MessageController from "../controllers/MessageController";
import auth from "../middlewares/auth";
import asyncHandler from "../middlewares/asyncHandler";

const router: Router = Router();

router
  .route("/")
  .post(asyncHandler(MessageController.createMessage))
  .get(asyncHandler(auth), asyncHandler(MessageController.getMessages));

router.delete(
  "/:id",
  asyncHandler(auth),
  asyncHandler(MessageController.deleteMessage)
);

export default router;
