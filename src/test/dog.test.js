const request = require("supertest");
const Dog = require("../models/dog");

const app = require("../app");
const sequelize = require("../database");

beforeAll(async () => {
  // Connect to test database
  await sequelize.authenticate().then(() => sequelize.sync());
});

afterEach(async () => {
  // Delete all dogs created during the test
  await Dog.destroy({ where: {} });
});

afterAll(async () => {
  // Close the database connection
  await sequelize.close();
});

describe("GET /ping", () => {
  test("should return correct response", async () => {
    const response = await request(app).get("/ping");
    console.log(response.text);
    expect(response.status).toBe(200);
    expect(response.text).toEqual("Dogshouseservice.Version1.0.1");
  });
});

describe("GET /dogs", () => {
  test("should return the list of dogs", async () => {
    const response = await request(app).get("/dogs");

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.dogs)).toBe(true);
  });
});

describe("POST /dogs", () => {
  test("should create a new dog", async () => {
    const newDog = {
      name: "test_dog11",
      color: "test_color",
      tail_length: 15,
      weight: 20,
    };

    const res = await request(app).post("/dogs").send(newDog);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Dog created successfully! ");
    expect(res.body.newDog).toEqual(expect.objectContaining(newDog));
  }, 600000);
});
