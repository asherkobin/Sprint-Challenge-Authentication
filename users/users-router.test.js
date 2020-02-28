require("dotenv").config();

const request = require("supertest");
const server = require("../api/server");

describe("Users Router", () => {
  it("Testing OK", async () => {
    expect(true).toBe(true);
  });

  describe("GET /api/users", () => {
    it("Status 200", async () => {
      const res = await request(server).get("/api/users");
      
      expect(res.status).toBe(200);
    });

    it("Array is Returned", async () => {
      const res = await request(server).get("/api/users");
      
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
