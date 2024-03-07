"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileStorageEngine_1 = __importDefault(require("./fileStorageEngine"));
const limits = {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
};
// const fileUpload = multer({ dest: "uploads/", limits });
const fileUpload = (0, multer_1.default)({
    storage: fileStorageEngine_1.default,
    limits,
});
module.exports = fileUpload;
exports.default = fileUpload;
