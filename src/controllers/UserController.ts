import { NextFunction, Request, Response } from "express";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validation/UserValidations";
import CustomError from "../errors/CustomError";
import UserModel from "../models/UserModel";
import { StatusCodes } from "http-status-codes";

interface RequestAuth extends Request {
  user: {
    userId: string;
    token: string;
  };
}

class UserController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const value = await loginUserSchema.validateAsync(req.body);

    const user = await UserModel.findOne({ email: value.email });

    if (!user) {
      throw new CustomError(
        "No account registered to the given email",
        StatusCodes.FORBIDDEN
      );
    }

    const isPasswordCorrect = user.isPasswordCorrect(value.password);

    if (!isPasswordCorrect)
      throw new CustomError("Incorrect password", StatusCodes.FORBIDDEN);

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ message: "success", data: { token } });
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const value = await registerUserSchema.validateAsync(req.body);

    const existingUser = await UserModel.findOne({ email: value.email });

    if (existingUser)
      throw new CustomError(
        "Email already used by another user",
        StatusCodes.BAD_REQUEST
      );

    const user = await UserModel.create(req.body);
    await user.save();

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: { token },
    });
  }

  public async getUserInfo(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user.userId;

    const user = await UserModel.find({ _id: userId }).select("_id name email");

    if (!user)
      throw new CustomError("No user of id " + userId, StatusCodes.NOT_FOUND);

    return res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        user,
      },
    });
  }

  public async update(req: Request, res: Response, next: NextFunction) {
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

    res.status(StatusCodes.OK).json({ status: "success", data: null });
  }
}

export default new UserController();
