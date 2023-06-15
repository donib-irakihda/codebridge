const express = require("express");
const { getDogs, createDog } = require("../controllers/dogController");

const dogRouter = express.Router();

dogRouter.get("/dogs", getDogs);

dogRouter.post("/dogs", createDog);

module.exports = dogRouter;
