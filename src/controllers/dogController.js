const Dog = require("../models/dog");

// GET /dogs

const getDogs = async (req, res) => {
  try {
    const { attribute, order } = req.query;

    // Determine the sorting order
    const sortOrder = order === "desc" ? "DESC" : "ASC";

    const sortAttribute = attribute || "id";

    const dogs = await Dog.findAll({
      attributes: ["name", "color", "tail_length", "weight"],
      raw: true,
      order: [[sortAttribute, sortOrder]],
    });

    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching dogs! " });
    console.log(error);
  }
};

// POST /dogs
const createDog = async (req, res) => {
  const { name, color, tail_length, weight } = req.body;

  try {
    // Check if a dog with same name already exists
    const existingDog = await Dog.findOne({
      where: { name },
    });

    if (existingDog) {
      return res
        .status(400)
        .json({ error: "A dog with the same name already exists." });
    }

    // Create a new dog
    const newDog = await Dog.create({
      name,
      color,
      tail_length,
      weight,
    });

    res.status(201).json({ message: "Dog created successfully! ", newDog });
  } catch (error) {
    res.status(500).json({ error: "Error while creating a dog." });
    console.log(error);
  }
};

module.exports = { getDogs, createDog };
