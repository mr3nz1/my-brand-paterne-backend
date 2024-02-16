"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../controllers/MessageController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router
    .route("/")
    .post((0, asyncHandler_1.default)(MessageController_1.default.createMessage))
    .get((0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(MessageController_1.default.getMessages));
router.delete("/:id", (0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(MessageController_1.default.deleteMessage));
exports.default = router;
