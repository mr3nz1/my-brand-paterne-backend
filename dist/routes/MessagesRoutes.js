"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../controllers/MessageController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router
    .route("/")
    .post(MessageController_1.default.createMessage)
    .get(auth_1.default, MessageController_1.default.getMessages);
router.delete("/:id", MessageController_1.default.deleteMessage);
exports.default = router;
