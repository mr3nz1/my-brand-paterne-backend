import { NextFunction, Request, Response } from "express";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validation/UserValidations";
import CustomError from "../errors/CustomError";
import UserModel from "../models/UserModel";
import { StatusCodes } from "http-status-codes";

class UserController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const value = await loginUserSchema.validateAsync(req.body);

      const user = new UserModel(req.body);

      if (!user) {
        throw new CustomError(
          "No account registered to the given email",
          StatusCodes.BAD_REQUEST
        );
      }

      const token = user.createJWT();

      res.status(StatusCodes.OK).json({ token: token });
    } catch (err) {
      next(err);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const value = await registerUserSchema.validateAsync(req.body);

      const user = new UserModel(req.body);
      await user.save();

      const token = user.createJWT();

      res.status(StatusCodes.CREATED).json({
        msg: "User created",
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const value = await registerUserSchema.validateAsync(req.body);

      const user = await UserModel.findOne({
        _id: req.params.id,
      });

      if (!user) {
        throw new CustomError(
          "No account with id: " + req.params.id,
          StatusCodes.BAD_REQUEST
        );
      }

      await user.updateOne(req.body);

      res.status(StatusCodes.OK).json({ msg: "User information updated" });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
