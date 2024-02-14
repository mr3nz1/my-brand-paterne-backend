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
const CommentValidation_1 = __importDefault(require("../validation/CommentValidation"));
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
const http_status_codes_1 = require("http-status-codes");
class CommentController {
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentData = yield CommentValidation_1.default.validateAsync(req.body);
                const comment = yield CommentModel_1.default.create(Object.assign({}, commentData));
                comment.save();
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    msg: "Succesfully Created",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield CommentModel_1.default.find({});
                // ensure that one can filter out what they want
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    msg: "Success",
                    comments,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteComment() { }
}
exports.default = new CommentController();
