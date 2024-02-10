"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticleController_1 = __importDefault(require("../controllers/ArticleController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(ArticleController_1.default.getArticles)
    .post(ArticleController_1.default.createArticle);
router
    .route("/:id")
    .get(ArticleController_1.default.getArticle)
    .patch(ArticleController_1.default.updateArticle)
    .delete(ArticleController_1.default.deleteArticle);
exports.default = router;
