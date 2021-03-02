const app = require('./index')
const request = require('supertest');

test('test', () => {
  expect(2).toBe(2)
})

test("It should respond with an array of students", async () => {
  const response = await request(app).get("*");
  expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
});