"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticleController_1 = __importDefault(require("../controllers/ArticleController"));
const fileUpload_1 = __importDefault(require("../utils/fileUpload"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(auth_1.default, ArticleController_1.default.getArticles)
    .post(auth_1.default, fileUpload_1.default.single("bannerImage"), ArticleController_1.default.createArticle);
router
    .route("/:id")
    .get(auth_1.default, ArticleController_1.default.getArticle)
    .patch(ArticleController_1.default.updateArticle)
    .delete(auth_1.default, ArticleController_1.default.deleteArticle);
exports.default = router;
