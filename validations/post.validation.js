const { body } = require("express-validator");

module.exports = [
  body("body")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Body is required")
    .isLength({ max: 300 })
    .withMessage("Max 300 charactes"),
];
