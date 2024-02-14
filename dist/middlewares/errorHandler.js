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
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const joi_1 = require("joi");
function errorHandler(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(err);
        if (err instanceof CustomError_1.default) {
            const customError = {
                statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: err.message || "Something went wrong. Try again later.",
            };
            return res
                .status(customError.statusCode)
                .json({ error: customError.message });
        }
        else if (err instanceof joi_1.ValidationError) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: err.message });
        }
        else {
            const customError = {
                message: err.message || "Something went wrong. Try again later.",
            };
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: customError.message });
        }
    });
}
exports.default = errorHandler;
