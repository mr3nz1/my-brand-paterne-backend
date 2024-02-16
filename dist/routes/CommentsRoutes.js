"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.route("/").post((0, asyncHandler_1.default)(CommentController_1.default.createComment));
router.route("/:authorId").get((0, asyncHandler_1.default)(CommentController_1.default.getComments));
router
    .route("/:id")
    .delete((0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(CommentController_1.default.deleteComment));
exports.default = router;
