"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const MessageValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    message: joi_1.default.string().min(4).required(),
});
exports.default = MessageValidationSchema;
