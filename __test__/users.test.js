const request = require('supertest');
const app = require("../server.js");
const { test, expect } = require("@jest/globals");

test('Get array of users from the users endpoint', async function(){
    let response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(200);
})