require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
var csrf = require("csurf");
const { sequelize } = require("./models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const myStore = new SequelizeStore({ db: sequelize });
myStore.sync();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Prevent XSS (Add CSP Header)
app.use(function (req, res, next) {
  res.setHeader("Content-Security-Policy", "default-src 'self' ");
  next();
});

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: myStore,
    // cookie: { secure: true },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));

// error handler
app.use(function (err, req, res, next) {
  res.send(err.message);
  console.log(err);
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  // // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
