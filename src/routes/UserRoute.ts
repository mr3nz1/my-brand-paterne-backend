import { Router } from "express";
import UserController from "../controllers/UserController";

const router: Router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("update", UserController.update);

export default router;