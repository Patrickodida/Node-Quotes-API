const request = require("supertest");
const app = require('../server.js');
const { test, expect } = require("@jest/globals");

test("Get array of authors from the authors endpoint", async function(){
    let response = await request(app).get("/api/v1/authors");
    expect(response.status).toBe(200);
});