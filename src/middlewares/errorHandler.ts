import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";
import { ValidationError } from "joi";

async function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    const customError = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || "Something went wrong. Try again later.",
    };

    return res
      .status(customError.statusCode)
      .json({ status: "error", message: customError.message });
  } else if (err instanceof ValidationError) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: err.message });
  } else {
    const customError = {
      message: err.message || "Something went wrong. Try again later.",
    };
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: customError.message });
  }
}

export default errorHandler;
