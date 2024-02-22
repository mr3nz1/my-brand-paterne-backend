"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleSchema = exports.createArticleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createArticleSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    isPublished: joi_1.default.boolean().required(),
});
exports.createArticleSchema = createArticleSchema;
const updateArticleSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    content: joi_1.default.string(),
    isPublished: joi_1.default.boolean(),
});
exports.updateArticleSchema = updateArticleSchema;
