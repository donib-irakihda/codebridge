const { Sequelize } = require("sequelize");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const database = process.env.DB_NAME;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mssql",
  port: 1433, // Set the port number if needed
  dialectOptions: {
    encrypt: true, // Set to true if your SQL Server requires an encrypted connection
  },
});

module.exports = sequelize;
