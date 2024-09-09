const moment = require("moment");
const { Post, User } = require("../models");

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [["updatedAt", "desc"]],
      include: User,
    });
    res.render("index", { posts, moment });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, UserId: 1 });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
