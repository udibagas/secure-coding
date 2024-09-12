const express = require("express");
const {
  login,
  register,
  showLoginForm,
  showRegisterForm,
  logout,
} = require("../controllers/auth.controller");
const router = express.Router();
const { body } = require("express-validator");
const loginValidation = require("../validations/login.validation");

router
  .post("/login", loginValidation, login)
  .post("/register", register)
  .get("/login", showLoginForm)
  .get("/register", showRegisterForm)
  .get("/logout", logout);

module.exports = router;
