const Dog = require("../models/dog");

const sequelize = require("./index");

const seedDatabase = async () => {
  try {
    await sequelize.sync();
    await Dog.bulkCreate([
      { name: "Neo", color: "red & amber", tail_length: 22, weight: 32 },
      { name: "Jessy", color: "black & white", tail_length: 7, weight: 14 },
    ]);

    console.log("Database seeding finished...");
  } catch (error) {
    console.error("Error while seeding the database: ", error);
  } finally {
    process.exit();
  }
};

seedDatabase();
