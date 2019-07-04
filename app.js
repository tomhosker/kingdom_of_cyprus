/*
This is where it all begins.
*/

// Imports.
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const favicon = require("express-favicon");

// Local imports.
const indexRouter = require("./routes/index");
const territorialRouter = require("./routes/territorial");

// Constants.
const notFound = 404;
const internalServerError = 500;

var app = express();

// View engine setup.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(__dirname+"/public/favicon.ico"));
app.use("/", indexRouter);
app.use("/territory", territorialRouter);

// Catch 404 and forward to error handler.
app.use(function(req, res, next){
  next(createError(notFound));
});

// Error handler.
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // Render the error page.
  res.status(err.status || internalServerError);
  res.render("error");
});

// Exports.
module.exports = app;
