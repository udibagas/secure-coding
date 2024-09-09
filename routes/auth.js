var express = require("express");
const { login, register } = require("../controllers/auth.controller");
var router = express.Router();

router.get("/login", login).get("/register", register);

module.exports = router;
