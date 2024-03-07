"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.statusCode = status;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.default = CustomError;
