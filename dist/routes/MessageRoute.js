"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../controllers/MessageController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(MessageController_1.default.getMessages)
    .post(MessageController_1.default.createMessage);
router
    .route("/:id")
    .get(MessageController_1.default.getMessage)
    .patch(MessageController_1.default.updateMessage)
    .delete(MessageController_1.default.deleteMessage);
exports.default = router;
