const { compareSync } = require("bcrypt");
const { User } = require("../models");
const { validationResult } = require("express-validator");

exports.showLoginForm = (req, res) => {
  const { message } = req.query;
  res.render("login", { message });
};

exports.showRegisterForm = (req, res) => {
  const { message } = req.query;
  res.render("register", { message });
};

exports.login = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const message = result
      .array()
      .map((r) => r.msg)
      .join(",");
    return res.status(400).redirect(`/login?message=${message}`);
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .redirect("/login?message=Invalid email or password");
    }

    if (!compareSync(password, user.password)) {
      return res
        .status(401)
        .redirect("/login?message=Invalid email or password");
    }

    req.session.user = user;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.redirect("/login");
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      const message = error.errors.map((e) => e.message).join(", ");
      return res.status(400).redirect(`/register?message=${message}`);
      // for REST API
      // return res.status(400).json({
      //   message: "Validation error",
      //   errors: error.errors.map((e) => e.message),
      // });
    }

    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) console.log(err);
    });

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
