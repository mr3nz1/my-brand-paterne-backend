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
const ArticleValidation_1 = require("../validation/ArticleValidation");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const http_status_codes_1 = require("http-status-codes");
const ArticleModel_1 = __importDefault(require("../models/ArticleModel"));
const fs_1 = __importDefault(require("fs"));
class ArticleController {
    createArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield ArticleValidation_1.createArticleSchema.validateAsync(req.body);
                if (!req.file)
                    throw new CustomError_1.default("Banner Image is required", http_status_codes_1.StatusCodes.BAD_REQUEST);
                const filename = req.file.filename;
                const article = new ArticleModel_1.default(Object.assign(Object.assign({}, req.body), { bannerImageUrl: req.file.filename }));
                yield article.save();
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "Article created" });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getArticles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield ArticleModel_1.default.find({}).select("_id, title description content bannerImageUrl");
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    msg: "Success",
                    articles,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleId = req.params.id;
                if (!articleId)
                    throw new CustomError_1.default("Please provide an article", http_status_codes_1.StatusCodes.BAD_REQUEST);
                const article = yield ArticleModel_1.default.findById(articleId).select("_id, title description content bannerImageUrl");
                if (!article)
                    throw new CustomError_1.default("No article of Id: " + articleId, http_status_codes_1.StatusCodes.NOT_FOUND);
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    msg: "Success",
                    article,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleId = req.params.id;
                if (!articleId)
                    throw new CustomError_1.default("Please provide an article", http_status_codes_1.StatusCodes.BAD_REQUEST);
                const article = yield ArticleModel_1.default.findByIdAndDelete(articleId);
                fs_1.default.unlink("./uploads/" + (article === null || article === void 0 ? void 0 : article.bannerImageUrl), (err) => {
                    if (err) {
                        throw new CustomError_1.default("Error while deleting image", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                });
                if (!article)
                    throw new CustomError_1.default("No article of Id: " + articleId, http_status_codes_1.StatusCodes.NOT_FOUND);
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    msg: "Success deleting article with id: " + articleId,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleId = req.params.id;
                if (!articleId)
                    throw new CustomError_1.default("Please provide an article", http_status_codes_1.StatusCodes.BAD_REQUEST);
                const value = yield ArticleValidation_1.updateArticleSchema.validateAsync(req.body);
                if (!req.file)
                    throw new CustomError_1.default("Banner Image is required", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new ArticleController();
