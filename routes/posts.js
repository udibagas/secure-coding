var express = require("express");
const { create, index, remove } = require("../controllers/posts.controller");
var router = express.Router();

router.get("", index).post("/", create).get("/delete/:id", remove);

module.exports = router;
