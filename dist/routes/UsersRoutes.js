"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.post("/login", (0, asyncHandler_1.default)(UserController_1.default.login));
router.post("/register", (0, asyncHandler_1.default)(UserController_1.default.register));
router.get("/getUserInfo", (0, asyncHandler_1.default)(auth_1.default), (0, asyncHandler_1.default)(UserController_1.default.getUserInfo));
router.patch("/update/:id", (0, asyncHandler_1.default)(auth_1.default)
// asyncHandler(UserController.update)
);
exports.default = router;
