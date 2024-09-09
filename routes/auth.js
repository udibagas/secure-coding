var express = require("express");
const {
  login,
  register,
  showLoginForm,
  showRegisterForm,
  logout,
} = require("../controllers/auth.controller");
const loginValidation = require("../validations/login.validation");
const validationMiddleware = require("../middlewares/validation.middleware");
var router = express.Router();

router
  .post("/login", loginValidation, validationMiddleware, login)
  .post("/register", register)
  .get("/login", showLoginForm)
  .get("/register", showRegisterForm)
  .get("/logout", logout);

module.exports = router;
