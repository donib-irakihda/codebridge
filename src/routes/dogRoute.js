const express = require("express");
const { getDogs, createDog } = require("../controllers/dogController");
const { validateCreateDog } = require("../validators/dogValidator");

const dogRouter = express.Router();

dogRouter.get("/dogs", getDogs);

dogRouter.post("/dogs", validateCreateDog, createDog);

module.exports = dogRouter;
