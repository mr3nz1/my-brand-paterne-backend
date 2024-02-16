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
const UserValidations_1 = require("../validation/UserValidations");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
class UserController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield UserValidations_1.loginUserSchema.validateAsync(req.body);
            const user = new UserModel_1.default(req.body);
            if (!user) {
                throw new CustomError_1.default("No account registered to the given email", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            const token = user.createJWT();
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: "success", data: { token } });
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield UserValidations_1.registerUserSchema.validateAsync(req.body);
            const user = yield UserModel_1.default.create(req.body);
            yield user.save();
            const token = user.createJWT();
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                status: "success",
                data: { token },
            });
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield UserValidations_1.registerUserSchema.validateAsync(req.body);
            const user = yield UserModel_1.default.findOne({
                _id: req.params.id,
            });
            if (!user) {
                throw new CustomError_1.default("No account with id: " + req.params.id, http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            yield user.updateOne(req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", data: null });
        });
    }
}
exports.default = new UserController();
