import { Router } from "express";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import asyncHandler from "../middlewares/asyncHandler";

const router: Router = Router();

router.post("/login", asyncHandler(UserController.login));
router.post("/register", asyncHandler(UserController.register));
router.patch(
  "/update/:id",
  asyncHandler(auth),
  asyncHandler(UserController.update)
);

export default router;
