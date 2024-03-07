"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleSchema = exports.createArticleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createArticleSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    content: joi_1.default.string(),
    isPublished: joi_1.default.boolean(),
    bannerImage: joi_1.default.object(),
}).custom((value, helpers) => {
    const { title, description, content, bannerImage } = value;
    const requiredFields = [title, description, content, bannerImage];
    const allFieldsPresent = requiredFields.every((field) => field !== undefined && field !== "");
    if (!allFieldsPresent) {
        return Object.assign(Object.assign({}, value), { isPublished: false });
    }
    return value;
});
exports.createArticleSchema = createArticleSchema;
const updateArticleSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    content: joi_1.default.string(),
    isPublished: joi_1.default.boolean(),
    bannerImage: joi_1.default.object(),
});
exports.updateArticleSchema = updateArticleSchema;
