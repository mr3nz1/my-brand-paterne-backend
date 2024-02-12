"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const http_status_codes_1 = require("http-status-codes");
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !String(authHeader).startsWith("Bearer ")) {
        const error = new CustomError_1.default("Authentication Invalid", http_status_codes_1.StatusCodes.BAD_REQUEST);
        return next(error);
    }
    const token = authHeader.split(" ")[1];
    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        req.user = {
            userId: payload.userId,
        };
        next();
    }
    catch (err) {
        const error = new CustomError_1.default("Authentication invalid", http_status_codes_1.StatusCodes.BAD_REQUEST);
        next(error);
    }
}
exports.default = auth;
