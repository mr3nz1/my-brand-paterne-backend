import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import fs from "fs";

interface AuthenticatedUser {
  userId: string;
}

interface AuthenticateRequest extends Request {
  user?: any;
}

async function auth(
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !String(authHeader).startsWith("Bearer ")) {
    const error = new CustomError(
      "Authentication Invalid",
      StatusCodes.BAD_REQUEST
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
  const payload = jwt.verify(token, JWT_SECRET_KEY) as AuthenticatedUser;

  req.user = {
    userId: payload.userId,
  };

  next();
  const error = new CustomError(
    "Authentication invalid",
    StatusCodes.BAD_REQUEST
  );
}

export default auth;
