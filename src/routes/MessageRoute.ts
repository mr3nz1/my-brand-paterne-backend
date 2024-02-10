import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router: Router = Router();

router
  .route("/")
  .get(MessageController.getMessages)
  .post(MessageController.createMessage);

router
  .route("/:id")
  .get(MessageController.getMessage)
  .patch(MessageController.updateMessage)
  .delete(MessageController.deleteMessage);

export default router;
