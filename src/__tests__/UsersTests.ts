import app from "../app";
import request from "supertest";

describe("user registration", () => {
  test("user registration with all data", async () => {
    const userRegistrationInfo = {
      name: "Murenzi Paterne",
      email: "msdaddds@gmail.com",
      password: "123",
    };

    try {
      const response = await request(app)
        .post("/api/v1/users/register")
        .send(userRegistrationInfo);

      expect(response.statusCode).toBe(201);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body.data).toBeDefined();
      expect(typeof response.body.status).toBe("string");
      expect(response.body.status).toEqual("success");
      expect(typeof response.body.data.token).toBe("string");
    } catch (err) {
      throw err; // Re-throw the error to fail the test
    }
  });

  test("user registration with missing properties users", async () => {
    const userRegistrationInfo = {
      name: "Murenzi Paterne",
      email: "aqweqweddddwdf@gmail.com",
    };

    try {
      const response = await request(app)
        .post("/api/v1/users/register")
        .send(userRegistrationInfo);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toBeDefined();

      expect(typeof response.body.status).toEqual("string");
      expect(response.body.status).toEqual("error");

      expect(typeof response.body.message).toEqual("string");
    } catch (err) {
      throw err;
    }
  });

  test("user registration with an existing email", async () => {
    const userRegistrationInfo = {
      name: "Murenzi Paterne",
      email: "murenzi419@gmail.com",
      password: "123",
    };

    try {
      const response = await request(app)
        .post("/api/v1/users/register")
        .send(userRegistrationInfo);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toBeDefined();

      expect(typeof response.body.status).toEqual("string");
      expect(response.body.status).toEqual("error");

      expect(typeof response.body.message).toEqual("string");
    } catch (err) {
      throw err;
    }
  });
});

describe("user login", () => {
  test("User login when all data is provided", async () => {
    const userLoginInfo = {
      email: "murenzi419@gmail.com",
      password: "123",
    };

    try {
      const response = await request(app)
        .post("/api/v1/users/login")
        .send(userLoginInfo);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeDefined();

      expect(response.body.status).toEqual("success");
      expect(typeof response.body.data).toEqual("object");

      expect(typeof response.body.data.token).toEqual("string");
    } catch (err) {
      throw err;
    }
  });

  test("User login when some data isn't provided", async () => {
    const userLoginInfo = {
      email: "murenzi419@gmail.com",
    };

    try {
      const response = await request(app)
        .post("/api/v1/users/login")
        .send(userLoginInfo);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toBeDefined();

      expect(response.body.status).toEqual("error");
      expect(typeof response.body.message).toEqual("string");
    } catch (err) {
      throw err;
    }
  });

  test("User login when the credentials are wrong", async () => {
    const userLoginInfo = {
      email: "murenzi419@gmail.com",
      password: "1w2sdfs3",
    };

    try {
      const response = await request(app)
        .post("/api/v1/users/login")
        .send(userLoginInfo);

      expect(response.statusCode).toEqual(403);
      expect(response.body).toBeDefined();

      expect(response.body.status).toEqual("error");
      expect(typeof response.body.message).toEqual("string");
    } catch (err) {
      throw err;
    }
  });
});

describe("get user info", () => {
  test("when there is a token", async () => {
    const userLoginInfo = {
      email: "murenzi419@gmail.com",
      password: "123",
    };

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ3NzBmOTIxOTYyODdmZTk1YTZjMjgiLCJpYXQiOjE3MDg2MTc5ODgsImV4cCI6MTcxMTIwOTk4OH0._eLRk6JPx5plArP5uTfEDtlQKYEQbRTAl54u72qbR40";
      const response = await request(app)
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
    } catch (err) {
      throw err;
    }
  });
});