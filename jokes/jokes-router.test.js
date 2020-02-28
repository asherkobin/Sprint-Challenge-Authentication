require("dotenv").config();

const request = require("supertest");
const server = require("../api/server");
const usersModel = require("../users/users-model");

async function getTokenFromNewUser() {
  await request(server)
    .post("/api/auth/register")
    .send({
      username: "jokesUser",
      password: "iHateDateJokes"
    });
  
  res = await request(server)
    .post("/api/auth/login")
    .send({
      username: "jokesUser",
      password: "iHateDateJokes"
    });

  return res.body.token;
}

describe("Jokes Router", () => {
  it("Testing OK", async () => {
    expect(true).toBe(true);
  });

  describe("GET /api/jokes", () => {
    it("No Credentials", async () => {
      const res = await request(server).get("/api/jokes");
      
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/jokes", () => {
    afterEach(() => {
      return usersModel.removeAll();
    });
    
    it("Jokes Returned", async () => {
      const token = await getTokenFromNewUser();
      const res = await request(server)
        .get("/api/jokes")
        .set("Authorization", token);
      
      expect(res.status).toBe(200);
    });
  });
});
