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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("user registration", () => {
    test("user registration with all data", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegistrationInfo = {
            name: "Murenzi Paterne",
            email: "msdaddds@gmail.com",
            password: "123",
        };
        try {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/users/register")
                .send(userRegistrationInfo);
            expect(response.statusCode).toBe(201);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.data).toBeDefined();
            expect(typeof response.body.status).toBe("string");
            expect(response.body.status).toEqual("success");
            expect(typeof response.body.data.token).toBe("string");
        }
        catch (err) {
            throw err; // Re-throw the error to fail the test
        }
    }));
    test("user registration with missing properties users", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegistrationInfo = {
            name: "Murenzi Paterne",
            email: "aqweqweddddwdf@gmail.com",
        };
        try {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/users/register")
                .send(userRegistrationInfo);
            expect(response.statusCode).toEqual(500);
            expect(response.body).toBeDefined();
            expect(typeof response.body.status).toEqual("string");
            expect(response.body.status).toEqual("error");
            expect(typeof response.body.message).toEqual("string");
        }
        catch (err) {
            throw err;
        }
    }));
    test("user registration with an existing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRegistrationInfo = {
            name: "Murenzi Paterne",
            email: "murenzi419@gmail.com",
            password: "123",
        };
        try {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/users/register")
                .send(userRegistrationInfo);
            expect(response.statusCode).toEqual(400);
            expect(response.body).toBeDefined();
            expect(typeof response.body.status).toEqual("string");
            expect(response.body.status).toEqual("error");
            expect(typeof response.body.message).toEqual("string");
        }
        catch (err) {
            throw err;
        }
    }));
});
describe("user login", () => {
    test("User login when all data is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginInfo = {
            email: "murenzi419@gmail.com",
            password: "123",
        };
        try {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/users/login")
                .send(userLoginInfo);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual("success");
            expect(typeof response.body.data).toEqual("object");
            expect(typeof response.body.data.token).toEqual("string");
        }
        catch (err) {
            throw err;
        }
    }));
    test("User login when some data isn't provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginInfo = {
            email: "murenzi419@gmail.com",
        };
        try {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/users/login")
                .send(userLoginInfo);
            expect(response.statusCode).toEqual(500);
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual("error");
            expect(typeof response.body.message).toEqual("string");
        }
        catch (err) {
            throw err;
        }
    }));
    test("User login when the credentials are wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginInfo = {
            email: "murenzi419@gmail.com",
            password: "1w2sdfs3",
        };
        try {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/users/login")
                .send(userLoginInfo);
            expect(response.statusCode).toEqual(403);
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual("error");
            expect(typeof response.body.message).toEqual("string");
        }
        catch (err) {
            throw err;
        }
    }));
});
describe("get user info", () => {
    test("when there is a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginInfo = {
            email: "murenzi419@gmail.com",
            password: "123",
        };
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ3NzBmOTIxOTYyODdmZTk1YTZjMjgiLCJpYXQiOjE3MDg2MTc5ODgsImV4cCI6MTcxMTIwOTk4OH0._eLRk6JPx5plArP5uTfEDtlQKYEQbRTAl54u72qbR40";
            const response = yield (0, supertest_1.default)(app_1.default)
                .get("/api/v1/users/getUserInfo")
                .set("Authorization", "Bearer " + token)
                .send(userLoginInfo);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual("success");
            expect(typeof response.body.data).toEqual("object");
            expect(typeof response.body.data.user._id).toEqual("string");
            expect(typeof response.body.data.user.name).toEqual("string");
            expect(typeof response.body.data.user.email).toEqual("string");
        }
        catch (err) {
            throw err;
        }
    }));
});
