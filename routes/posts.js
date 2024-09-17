const express = require("express");
const { create, remove } = require("../controllers/posts.controller");
const postValidation = require("../validations/post.validation");
const csrfProtection = require("../middlewares/csrf.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const multer = require("multer");
const path = require("path");
const { Sanitizer } = require("sanitize");
const sanitizer = new Sanitizer();

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (res, file, cb) {
      const sanitizedFilename = sanitizer.str(file.originalname);
      cb(null, Date.now() + sanitizedFilename);
    },
  }),
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // boolean

    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb("Error: only images allowed");
    }
  },
});

const router = express.Router();

router
  .get("", (req, res) => {
    res.redirect("/");
  })
  .post("/", upload.single("image"), postValidation, csrfProtection, create)
  .get("/delete/:id", isAdmin, remove);

module.exports = router;
