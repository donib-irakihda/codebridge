const express = require("express");
const bodyParser = require("body-parser");
const dogRouter = require("./routes/dogRoute");
const sequelize = require("./database");
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.get("/ping", (req, res) => {
  res.status(200).send("Dogshouseservice.Version1.0.1");
});

app.use("/", dogRouter);

// Database connection
sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    console.log(`Database connected successfully at ${process.env.DB_NAME}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = app;
