import app from "../app";
import request from "supertest";
import fs from "fs/promises";
import mongoose from "mongoose";
import UserModel from "../models/UserModel";

let token: string;
let id: string;

beforeAll(async () => {
  const userLoginInfo = {
    email: "test@gmail.com",
    password: "123",
  };

  const response = await request(app)
    .post("/api/v1/users/login")
    .send(userLoginInfo);

  token = response.body.data.token;
}, 150000);

describe("messages", () => {
  describe("create message", () => {
    it("Should add and return message data when given all data", async () => {
      const messageInfo = {
        name: "John Doe",
        email: "john@gmail.com",
        message: "Great work on your porfolio.",
      };

      const response = await request(app)
        .post("/api/v1/messages")
        .send(messageInfo);

      expect(response.statusCode).toEqual(201);
      id = response.body.data.message.id;
    });

    it("Should return error when some data is missing", async () => {
      const messageInfo = {
        name: "John Doe",
        message: "Great work on your porfolio.",
      };

      const response = await request(app)
        .post("/api/v1/comments")
        .send(messageInfo);

      expect(response.statusCode).toEqual(500);
    });
  });

  describe("get messages", () => {
    it("Should return messages when given all data", async () => {
      const response = await request(app)
        .get("/api/v1/messages")
        .set("Authorization", "Bearer " + token);

      expect(response.statusCode).toEqual(200);
      expect(typeof response.body.data).toEqual("object");
    });

    it("Should return error when there is not auth token", async () => {
      const response = await request(app).get("/api/v1/messages");

      expect(response.statusCode).toEqual(403);
      expect(typeof response.body.message).toEqual("string");
    });
  });

  describe("delete message", () => {
    it("Should delete messsage if id is valid or message exists", async () => {
      const response = await request(app)
        .delete("/api/v1/messages/" + id)
        .set("Authorization", "Bearer " + token);

      expect(response.statusCode).toEqual(200);
    });

    it("Should return error if message doesn't exist", async () => {
      const response = await request(app)
        .delete("/api/v1/messages/" + "65ccbd2bc8a61d3a4f0ea1cf")
        .set("Authorization", "Bearer " + token);

      expect(response.statusCode).toEqual(404);
    });

    it("Should return error if there is no auth token", async () => {
      const response = await request(app).delete("/api/v1/messages/" + id);

      expect(response.statusCode).toEqual(403);
      expect(typeof response.body.message).toEqual("string");
    });
  });
});

afterAll(async () => {
  try {
    await UserModel.findOneAndDelete({
      email: "test1@gmail.com",
    });
    await mongoose.disconnect();
  } catch (err) {
    throw err;
  }
}, 150000);
