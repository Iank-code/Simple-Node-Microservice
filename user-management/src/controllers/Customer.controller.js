const Customer = require("./../models/customer.model");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const Logger = require("./../middlewares/logger/logger");

class CustomerController {
  constructor() {}

  // Getting all User
  async getAllUsers(req, res) {
    try {
      const allUsers = await Customer.find({});
      if (!allUsers) {
        res.status(200).json({ message: "No users found" });
      }

      res.status(200).json({ data: allUsers });
    } catch (error) {
      Logger.error(error);
    }
  }

  // Register
  async Register(req, res) {
    try {
      if (req.body.password !== req.body.password_confirmation) {
        res.status(500).json({
          message: "Password or email is incorrect",
        });
      }

      const newUser = new Customer({
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.SHA256(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
      });

      await newUser.save();
      res
        .status(200)
        .json({ message: "Account created Successfully. Login to proceed." });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Server error",
        error
      });
    }
  }
  async Login(req, res) {
    try {
      const user = await Customer.findOne({ email: req.body.email });

      if (!user) {
        res
          .status(404)
          .json({ message: "Either password or email is incorrect" });
      }
      const hashed = CryptoJS.SHA256(
        req.body.password,
        process.env.PASS_SEC
      ).toString();

      const ifPasswordMatch = user.password === hashed ? true : false;

      if (!ifPasswordMatch) {
        res.status(404).json({
          message: "Login failed. Either password or email is incorrect",
        });
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
        expiresIn: "12h",
      });

      const { password, ...others } = user.toObject();

      res.status(200).json({
        message: "Login successful",
        data: {
          Customer: others,
          access_token: accessToken,
        },
      });
    } catch (error) {
      Logger.debug(error);
      return {
        status: 500,
        message: "User Login Failed",
        error: {
          errors: {
            details: error,
          },
        },
      };
    }
  }

  // Getting customer profile
  async getCustomerProfile(_, res) {
    try {
      const id = req.user;
      const getCustomer = await Customer.findById(id);

      if (!getCustomer) {
        res.status(404).json({ message: "Customer not found" });
      }

      res
        .status(200)
        .json({ message: "You profile has been found", data: getCustomer });
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = new CustomerController();
