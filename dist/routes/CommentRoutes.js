"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(CommentController_1.default.getComments)
    .post(CommentController_1.default.createComment);
router
    .route("/:id")
    .get(CommentController_1.default.getComment)
    .patch(CommentController_1.default.updateComment)
    .delete(CommentController_1.default.deleteComment);
exports.default = router;
