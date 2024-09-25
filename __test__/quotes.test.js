const request = require("supertest");
const app = require("../server.js");
const { test, expect } = require("@jest/globals");

test("Get array of quotes from the quotes endpoint", async function(){
    let response = await request(app).get("/api/v1/quotes");
    expect(response.status).toBe(200);
})