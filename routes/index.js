var express = require("express");
const { index } = require("../controllers/posts.controller");
var router = express.Router();

router.get("/", index);
router.use(require("./auth"));
router.use("/posts", require("./posts"));

module.exports = router;
