const { User } = require("../models");

exports.showLoginForm = (req, res) => {
  res.render("login");
};

exports.showRegisterForm = (req, res) => {
  res.render("register");
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // TODO: do authentication
    // const user = await User.findOne({ where: { email } });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    // TODO:  do authentication
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    // TODO: clear cookies
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
