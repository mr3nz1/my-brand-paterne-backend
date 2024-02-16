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
const CommentValidation_1 = __importDefault(require("../validation/CommentValidation"));
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const ArticleModel_1 = __importDefault(require("../models/ArticleModel"));
class CommentController {
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentData = yield CommentValidation_1.default.validateAsync(req.body);
            const article = yield ArticleModel_1.default.findById(commentData.articleId);
            if (!article)
                throw new CustomError_1.default("No article of Id: " +
                    commentData.articleId +
                    ". You can not add a comment to an unexistent article.", http_status_codes_1.StatusCodes.NOT_FOUND);
            const comment = yield CommentModel_1.default.create(Object.assign({}, commentData));
            comment.save();
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                status: "success",
                data: null,
            });
        });
    }
    getComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleId = req.params.articleId;
            if (!articleId)
                throw new CustomError_1.default("Article Id is required", http_status_codes_1.StatusCodes.BAD_REQUEST);
            const comments = yield CommentModel_1.default.find({ articleId });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                data: { comments },
            });
        });
    }
    deleteComment() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new CommentController();
