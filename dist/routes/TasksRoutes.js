"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(auth_1.default, TaskController_1.default.getTasks)
    .post(auth_1.default, TaskController_1.default.createTask);
router
    .route("/:id")
    .delete(auth_1.default, TaskController_1.default.deleteTask)
    .patch(auth_1.default, TaskController_1.default.updateTask);
exports.default = router;
