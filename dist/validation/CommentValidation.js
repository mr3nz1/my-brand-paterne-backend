"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createCommentSchema = joi_1.default.object({
    articleId: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    comment: joi_1.default.string().required(),
});
exports.default = createCommentSchema;
