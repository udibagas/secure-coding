var express = require("express");
const {
  login,
  register,
  showLoginForm,
  showRegisterForm,
  logout,
} = require("../controllers/auth.controller");
var router = express.Router();

router
  .post("/login", login)
  .post("/register", register)
  .get("/login", showLoginForm)
  .get("/register", showRegisterForm)
  .get("/logout", logout);

module.exports = router;
