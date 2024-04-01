const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json("Server working FINE");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on 👉🏼 3000`);
});
