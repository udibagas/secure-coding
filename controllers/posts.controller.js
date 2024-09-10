const moment = require("moment");
const { Post, User, sequelize } = require("../models");

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [["updatedAt", "desc"]],
      include: User,
    });
    res.render("index", { posts, moment, user: req.session.user });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
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
