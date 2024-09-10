const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
// const { log } = require("./middlewares/log.middleware");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Prevent XSS (Add CSP Header)
// app.use(function (req, res, next) {
//   res.setHeader("Content-Security-Policy", "default-src 'self' ");
//   next();
// });

// app.use(log);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));

// error handler
app.use(function (err, req, res, next) {
  res.send(err);
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  // // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
