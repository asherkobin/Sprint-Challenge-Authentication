require("dotenv").config();

const request = require("supertest");
const server = require("../api/server");
const usersModel = require("../users/users-model");

const testUser = {
  username: "testUser",
  password: "testPassword"
};

async function registerTestUser() {
  res = await request(server)
    .post("/api/auth/register")
    .send({
      username: testUser.username,
      password: testUser.password
    });

  return res.status;
}

describe("Auth Router", () => {
  it("Testing OK", async () => {
    expect(true).toBe(true);
  });

  describe("POST /auth/register", () => {
    afterEach(() => {
      return usersModel.removeAll();
    });

    it("Register No Credentials", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({});

      expect(res.status).toBe(400);
    });

    it("Register With Credentials", async () => {
      const status201 = await registerTestUser();

      expect(status201).toBe(201);
    });

    it("Register With Same User", async () => {
      const status201 = await registerTestUser();
      const status401 = await registerTestUser();

      expect(status201).toBe(201);
      expect(status401).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    afterEach(() => {
      return usersModel.removeAll();
    });

    it("Login No Credentials", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({});
      
      expect(res.status).toBe(400);
    });

    it("Login Wrong Credentials", async () => {
      const status201 = await registerTestUser();
      const res = await request(server)
        .post("/api/auth/login")
        .send({
          username: testUser.username,
          password: "WrongPassword"
        });
      
      expect(status201).toBe(201);
      expect(res.status).toBe(401);
    });

    it("Login Token Returned", async () => {
      const status201 = await registerTestUser();
      const res = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(status201).toBe(201);
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });
});
