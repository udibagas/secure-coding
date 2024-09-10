var express = require("express");
const { create, index, remove } = require("../controllers/posts.controller");
const multer = require("multer");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
var router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .get("", index)
  .post("/", upload.single("image"), create)
  .get("/delete/:id", isAdmin, remove);

module.exports = router;
