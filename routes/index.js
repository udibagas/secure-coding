const express = require("express");
const { index } = require("../controllers/posts.controller");
const { auth } = require("../middlewares/auth.middleware");
const csrfProtection = require("../middlewares/csrf.middleware");
const router = express.Router();

router.get("/csrf", (req, res) => {
  res.render("csrf");
});

router.use(require("./auth"));

router.use(auth);
router.get("/", csrfProtection, index); // form new post & timeline
router.use("/posts", require("./posts"));

module.exports = router;
