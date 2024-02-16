"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskValidation_1 = require("../validation/TaskValidation");
const TaskModel_1 = __importDefault(require("../models/TaskModel"));
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const ArticleValidation_1 = require("../validation/ArticleValidation");
class TaskController {
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const taskData = yield TaskValidation_1.createTaskUserSchema.validateAsync(req.body);
            const task = yield TaskModel_1.default.create(Object.assign({}, taskData));
            yield task.save();
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                status: "success",
                data: null,
            });
        });
    }
    getTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield TaskModel_1.default.find({});
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                data: { tasks },
            });
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = req.params.id;
            if (!taskId)
                throw new CustomError_1.default("Task Id is required", http_status_codes_1.StatusCodes.BAD_REQUEST);
            const task = yield TaskModel_1.default.findByIdAndDelete(taskId);
            if (!task)
                throw new CustomError_1.default("No task with Id: " + taskId, http_status_codes_1.StatusCodes.NOT_FOUND);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "success", data: null });
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = req.params.id;
                if (!taskId)
                    throw new CustomError_1.default("Task Id is Required", http_status_codes_1.StatusCodes.NOT_FOUND);
                const taskData = yield ArticleValidation_1.updateArticleSchema.validateAsync(req.body);
                const task = yield TaskModel_1.default.findById(taskId);
                if (!task)
                    throw new CustomError_1.default("No task of Id: " + taskId, http_status_codes_1.StatusCodes.NOT_FOUND);
                yield task.updateOne(Object.assign({}, taskData), {
                    new: true,
                });
                yield task.save();
                console.log(task);
                console.log(taskData);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: "success",
                    data: null,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new TaskController();
