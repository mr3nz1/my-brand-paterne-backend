"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(TaskController_1.default.getTasks)
    .post(TaskController_1.default.createTask);
router
    .route("/:id")
    .get(TaskController_1.default.getTask)
    .patch(TaskController_1.default.updateTask)
    .delete(TaskController_1.default.deleteTask);
exports.default = router;
