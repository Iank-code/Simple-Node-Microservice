const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [3, "The password is not strong enough"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Customer", customerSchema);
