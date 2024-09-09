const { body } = require("express-validator");

module.exports = [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];
