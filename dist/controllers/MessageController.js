"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageValidation_1 = __importDefault(require("../validation/MessageValidation"));
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
class MessageController {
    createMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageData = yield MessageValidation_1.default.validateAsync(req.body);
            const message = yield MessageModel_1.default.create(messageData);
            message.save();
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                status: "success",
                data: {
                    message: {
                        id: message._id,
                        name: message.name,
                        email: message.email,
                        message: message.message,
                    },
                },
            });
        });
    }
    getMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield MessageModel_1.default.find({}).sort({ createdAt: -1 });
            ;
            const transformedMessages = messages.map((message) => {
                return {
                    id: message._id,
                    name: message.name,
                    email: message.email,
                    message: message.message,
                    createdAt: message.createdAt,
                };
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                data: { messages: transformedMessages },
            });
        });
    }
    deleteMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            // if (!messageId)
            //   throw new CustomError("Message Id is required", StatusCodes.BAD_REQUEST);
            const message = yield MessageModel_1.default.findByIdAndDelete(messageId);
            if (!message)
                throw new CustomError_1.default("Can't find message of id: " + messageId, http_status_codes_1.StatusCodes.NOT_FOUND);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", data: null });
        });
    }
}
exports.default = new MessageController();
