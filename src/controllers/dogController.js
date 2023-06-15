const Dog = require("../models/dog");

// GET /dogs

const getDogs = async (req, res) => {
  try {
    const { attribute, order, pageNumber, limit } = req.query;

    // Determine the sorting order and attribute
    const sortOrder = order === "desc" ? "DESC" : "ASC";
    const sortAttribute = attribute || "id";

    // Calculate the offset for pagination
    const offset = pageNumber
      ? (parseInt(pageNumber) - 1) * parseInt(limit)
      : 0;

    const dogs = await Dog.findAll({
      attributes: ["name", "color", "tail_length", "weight"],
      raw: true,
      order: [[sortAttribute, sortOrder]],

      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Total number of counts
    const totalCount = await Dog.count();

    // Total number of pages
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.status(200).json({
      dogs,
      current_page: parseInt(pageNumber) || 1,
      total_pages: totalPages || 1,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error while fetching dogs! ",
      errorMessage: error.message,
    });
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
