const request = require("supertest");
const app = require('../server.js');
const { test, expect } = require("@jest/globals");
const { PrismaClient } = require('@prisma/client');

beforeAll(async()=>{
   let response = await request(app).post('/api/v1/authors').send({
        "id": 8,
        "name": "rooney",
        "picture": "https://i.pinimg.com/474x/b9/9a/bb/b99abb28930698aa4487b5b2a16001e8.jpg"
    }).set('Accept', 'application/json')
    expect(response.status).toBe(201);
})

test("Get array of authors from the authors endpoint", async function(){
    let response = await request(app).get("/api/v1/authors");
    expect(response.status).toBe(200);
});