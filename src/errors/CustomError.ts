import { ValidationError } from "joi";
import { StatusCodes } from "http-status-codes";

interface CustomErrorType {
  message: string;
  statusCode: number;
}

class CustomError extends Error implements CustomErrorType {
  statusCode: number = StatusCodes.BAD_REQUEST;
  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
