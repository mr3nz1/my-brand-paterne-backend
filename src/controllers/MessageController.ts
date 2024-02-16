import { Request, Response, NextFunction } from "express";
import MessageValidationSchema from "../validation/MessageValidation";
import MessageModel from "../models/MessageModel";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";

class MessageController {
  public async createMessage(req: Request, res: Response, next: NextFunction) {
    const messageData = await MessageValidationSchema.validateAsync(req.body);

    const message = await MessageModel.create(messageData);

    message.save();

    return res.status(StatusCodes.CREATED).json({
      msg: "Message created",
    });
  }

  public async getMessages(req: Request, res: Response, next: NextFunction) {
    const messages = await MessageModel.find({});
    return res.status(StatusCodes.OK).json({
      msg: "Success",
      messages,
    });
  }

  public async deleteMessage(req: Request, res: Response, next: NextFunction) {
    const messageId = req.params.id;

    if (!messageId)
      throw new CustomError("Message Id is required", StatusCodes.BAD_REQUEST);

    const message = await MessageModel.findByIdAndDelete(messageId);

    if (!message)
      throw new CustomError(
        "Message of id: " + messageId,
        StatusCodes.NOT_FOUND
      );

    return res.status(StatusCodes.OK).json({ msg: "Successfully deleted" });
  }
}

export default new MessageController();
