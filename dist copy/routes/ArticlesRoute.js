"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticleController_1 = __importDefault(require("../controllers/ArticleController"));
const fileUpload_1 = __importDefault(require("../utils/fileUpload"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get((0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(ArticleController_1.default.getArticles))
    .post((0, asyncHandler_1.default)(auth_1.default), fileUpload_1.default.single("bannerImage"), (0, asyncHandler_1.default)(ArticleController_1.default.createArticle));
router
    .route("/:id")
    .get((0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(ArticleController_1.default.getArticle))
    .patch((0, asyncHandler_1.default)(auth_1.default), fileUpload_1.default.single("bannerImage"), (0, asyncHandler_1.default)(ArticleController_1.default.updateArticle))
    .delete((0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(ArticleController_1.default.deleteArticle));
exports.default = router;
