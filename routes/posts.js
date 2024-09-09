var express = require("express");
const { create, index } = require("../controllers/posts.controller");
var router = express.Router();

router.get("", index);
router.post("/", create);

module.exports = router;
