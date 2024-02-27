import app from "../app";
import request from "supertest";
import mongoose from "mongoose";

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

describe("tasks", () => {
  describe("create task", () => {
    it("Should add a task", async () => {
      const taskInfo = {
        title: "Comments",
        content: "Added",
      };

      try {
        const response = await request(app)
          .post("/api/v1/tasks")
          .set("Authorization", "Bearer " + token)
          .send(taskInfo);

        expect(response.statusCode).toEqual(201);
        expect(typeof response.body.data).toEqual("object");

        id = response.body.data.task.id;
      } catch (err) {
        throw err;
      }
    });

    it("Should return an error if some info is missing", async () => {
      const taskInfo = {
        title: "Comments",
      };

      try {
        const response = await request(app)
          .post("/api/v1/tasks")
          .set("Authorization", "Bearer " + token)
          .send(taskInfo);

        expect(response.statusCode).toEqual(500);
        expect(typeof response.body.message).toEqual("string");
      } catch (err) {
        throw err;
      }
    });

    it("Should throw error if the token isn't submitted", async () => {
      const taskInfo = {
        title: "Comments",
        content: "Implement crud for the comments",
      };

      try {
        const response = await request(app)
          .post("/api/v1/tasks")
          .send(taskInfo);

        expect(response.statusCode).toEqual(403);
        expect(typeof response.body.message).toEqual("string");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("Update task", () => {
    it("Should update a task", async () => {
      const taskInfo = {
        content: "Updated",
      };

      try {
        const response = await request(app)
          .patch("/api/v1/tasks/" + id)
          .set("Authorization", "Bearer " + token)
          .send(taskInfo);

        expect(response.statusCode).toEqual(200);
        expect(typeof response.body.data).toEqual("object");
      } catch (err) {
        throw err;
      }
    });

    it("Should throw error if the token isn't submitted", async () => {
      const taskInfo = {
        content: "Implement crud for the comments",
      };

      try {
        const response = await request(app)
          .patch("/api/v1/tasks/" + id)
          .send(taskInfo);

        expect(response.statusCode).toEqual(403);
        expect(typeof response.body.message).toEqual("string");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("Get tasks", () => {
    it("Should return tasks", async () => {
      try {
        const response = await request(app)
          .get("/api/v1/tasks")
          .set("Authorization", "Bearer " + token);

        expect(response.statusCode).toEqual(200);
        expect(typeof response.body.data).toEqual("object");
        expect(typeof response.body.data.tasks).toEqual("object");
      } catch (err) {
        throw err;
      }
    });

    it("Should throw error if the token isn't submitted", async () => {
      try {
        const response = await request(app).get("/api/v1/tasks");

        expect(response.statusCode).toEqual(403);
        expect(typeof response.body.message).toEqual("string");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("Delete task", () => {
    it("Should delete the created task", async () => {
      try {
        const response = await request(app)
          .delete("/api/v1/tasks/" + id)
          .set("Authorization", "Bearer " + token);

        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toEqual(null);
      } catch (err) {
        throw err;
      }
    });

    it("Should throw error if the token isn't submitted", async () => {
      try {
        const response = await request(app).delete("/api/v1/tasks/" + id);

        expect(response.statusCode).toEqual(403);
        expect(typeof response.body.message).toEqual("string");
      } catch (err) {
        throw err;
      }
    });
  });
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    throw err;
  }
}, 150000);
