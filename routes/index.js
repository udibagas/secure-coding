var express = require("express");
const { index } = require("../controllers/posts.controller");
const { auth } = require("../middlewares/auth.middleware");
var router = express.Router();

router.get("/csrf", (req, res) => {
  res.render("csrf");
});

router.use(require("./auth"));

router.use(auth);
router.get("/", index);
router.use("/posts", require("./posts"));

module.exports = router;
