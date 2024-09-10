const { body } = require("express-validator");

module.exports = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom((value) => {
      if (!value.includes("user")) {
        throw new Error("Email harus ada kata user");
      }

      return true;
    }),

  body("password").notEmpty().withMessage("Password is required"),
];
