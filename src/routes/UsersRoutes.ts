import { Router } from "express";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.patch("/update/:id", auth, UserController.update);

export default router;
