const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Logger = require("./middlewares/logger/logger");

// Importing routes
const customerRoute = require("./routes/customer.route.js");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected successfully"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(cors());

app.use("/api/v1.0/customer", customerRoute);

app.listen(process.env.PORT || 5000, () => {
  Logger.debug("Server started");
  Logger.info(`Running on 👉🏼 ${process.env.PORT}`);
});
