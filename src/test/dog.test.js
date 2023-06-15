const request = require("supertest");
const Dog = require("../models/dog");

const app = require("../app");
const sequelize = require("../database");

beforeAll(async () => {
  // Connect to test database
  await sequelize.authenticate().then(() => sequelize.sync());
});

beforeEach(async () => {
  // Create a dog with a unique name before each test
  await Dog.create({
    name: "my_dog",
    color: "brown",
    tail_length: 10,
    weight: 20,
  });
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
      name: "test_dog",
      color: "test_color",
      tail_length: 15,
      weight: 20,
    };

    const res = await request(app).post("/dogs").send(newDog);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Dog created successfully! ");
    expect(res.body.newDog).toEqual(expect.objectContaining(newDog));
  }, 600000);

  test("should return an error if the dog name already exists", async () => {
    const dogData = {
      name: "my_dog",
      color: "test2_color",
      tail_length: 15,
      weight: 20,
    };
    const res = await request(app).post("/dogs").send(dogData);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A dog with the same name already exists.");
  }, 600000);

  test.only("should return error when provided invalid data", async () => {
    const invalidData = {
      name: "",
      color: 25,
      tail_length: -8,
      weight: "abc",
    };

    const res = await request(app).post("/dogs").send(invalidData);

    console.log(res.body);
    expect(res.status).toBe(500);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        "Name is required!",
        "Tail length must be a positive number",
        "Weight must be a positive number",
      ])
    );
  });
});
