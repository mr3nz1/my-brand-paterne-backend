import app from "../app";
import request from "supertest";
import fs from "fs/promises";
import mongoose from "mongoose";

let token: string;
let articleId: string;
let commentId: string;

beforeAll(async () => {
  const userLoginInfo = {
    email: "test@gmail.com",
    password: "123",
  };

  const response1 = await request(app)
    .post("/api/v1/users/login")
    .send(userLoginInfo);

  token = response1.body.data.token;

  const bannerImage = await fs.readFile(`uploads/article_banner_image.jpg`);

  const response2 = await request(app)
    .post("/api/v1/articles")
    .set("Authorization", "Bearer " + token)
    .field("title", "Test title")
    .field("description", "Description for the test")
    .field("content", "Content for the test")
    .field("isPublished", true)
    .attach("bannerImage", bannerImage, "article_banner_image.jpg");

  articleId = response2.body.data.article.id;
});

describe("comments", () => {
  describe("create comment", () => {
    it("Should add and return articles when given all data", async () => {
      const commentInfo = {
        articleId: articleId,
        name: "John Doe",
        email: "johndoe@gmail.com",
        comment: "Great article, and informative",
      };

      const response = await request(app)
        .post("/api/v1/comments")
        .send(commentInfo);

      expect(response.statusCode).toEqual(201);
      expect(typeof response.body.data).toEqual("object");
      expect(typeof response.body.data.comment).toEqual("object");
      commentId = response.body.data.comment.id;
    });

    it("Should return error when some data is missing", async () => {
      const commentInfo = {
        articleId: articleId,
        name: "John Doe",
        comment: "Great article, and informative",
      };

      const response = await request(app)
        .post("/api/v1/comments")
        .send(commentInfo);

      expect(response.statusCode).toEqual(500);
      expect(typeof response.body.message).toEqual("string");
    });
  });

  describe("get comments", () => {
    it("Should get comments ", async () => {
      const response = await request(app).get(
        "/api/v1/comments/" + "65d5aecf8b4cc5d3a040f9a6"
      );

      expect(response.statusCode).toEqual(200);
      expect(typeof response.body.data).toEqual("object");
      expect(typeof response.body.data.comments).toEqual("object");
    });
  });

  describe("delete comment", () => {
    it("Should delete a comment", async () => {
      const response = await request(app)
        .delete("/api/v1/comments/" + commentId)
        .set("Authorization", "Bearer " + token);

      expect(response.statusCode).toEqual(200);
      expect(response.body.data).toEqual(null);
    });
  });
});

afterAll(async () => {
  try {
    await request(app)
      .delete("/api/v1/articles/" + articleId)
      .set("Authorization", "Bearer " + token);

    await mongoose.disconnect();
  } catch (err) {
    throw err;
  }
});
