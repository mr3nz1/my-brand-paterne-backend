import { Router } from "express";
import MessageController from "../controllers/MessageController";
import auth from "../middlewares/auth";

const router: Router = Router();

router
  .route("/")
  .post(MessageController.createMessage)
  .get(auth, MessageController.getMessages);

router.delete("/:id", MessageController.deleteMessage);

export default router;
