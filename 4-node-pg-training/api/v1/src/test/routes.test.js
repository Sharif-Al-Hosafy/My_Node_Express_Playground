const request = require("supertest");
const buildApp = require("../app");
const dbConn = require("../config/pool");
const { count } = require("../repos/user.repo");

beforeAll(() => {
  return dbConn.connect({
    host: "localhost",
    port: "5432",
    database: "socialnetwork-test",
    user: "shix",
    password: process.env.DB_PASS,
  });
});

afterAll(() => {
  return dbConn.close();
});

it("create a user", async () => {
  const startingCount = await count();

  await request(buildApp())
    .post("/api/v1/users")
    .send({ username: "testuser", bio: "test bio" })
    .expect(200);

  const finishCount = await count();
  expect(finishCount - startingCount).toEqual(1);
});
