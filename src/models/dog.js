const { DataTypes } = require("sequelize");

const sequelize = require("../database/index");

const Dog = sequelize.define("Dog", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tail_length: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Dog;
