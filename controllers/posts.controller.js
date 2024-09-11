const moment = require("moment");
const { Post, User, sequelize } = require("../models");
const { validationResult } = require("express-validator");

exports.index = async (req, res, next) => {
  const { message } = req.query;
  try {
    const posts = await Post.findAll({
      order: [["updatedAt", "desc"]],
      include: User,
    });
    res.render("index", {
      posts,
      moment,
      user: req.session.user,
      message,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const message = result
      .array()
      .map((r) => r.msg)
      .join(",");
    return res.status(400).redirect(`/?message=${message}`);
    // REST API
    // return res.status(400).json(result.array().map((r) => r.msg));
    // next(new ValidationError(result))
  }

  try {
    await Post.create({
      ...req.body,
      UserId: req.session.user.id,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    // id = 8;DELETE FROM "Posts";
    // await sequelize.query(`DELETE FROM "Posts" WHERE id = ${id}`); // rawan terkena sql injection
    // await sequelize.query(`DELETE FROM "Posts" WHERE id = $1`, {
    //   bind: [id],
    // });
    await Post.destroy({ where: { id, UserId: req.session.user.id } });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
