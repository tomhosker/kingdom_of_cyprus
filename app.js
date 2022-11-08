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
const stillsRouter = require("./routes/stills");
const asisRouter = require("./routes/asis");
const peopleRouter = require("./routes/people");
const territorialRouter = require("./routes/territories");
const chivalricRouter = require("./routes/chivalric");
const govRouter = require("./routes/gov");
const patentsRouter = require("./routes/patents");
const calendarRouter = require("./routes/calendar");
const profileRouter = require("./routes/profiles");
const academyRouter = require("./routes/academy");
const canonsRouter = require("./routes/canons");

// Constants.
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// Constant objects.
const app = express();

// View engine setup.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
if (app.get("env") === "development") app.locals.pretty = true;

// Use application-level middleware for common functionality, including
// parsing and session handling.
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
    require("express-session")({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false
    })
);

// Initialise some other resources.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// ROUTES.
app.use("/", indexRouter);
app.use("/stills", stillsRouter);
app.use("/asis", asisRouter);
app.use("/people", peopleRouter);
app.use("/territories", territorialRouter);
app.use("/chivalric", chivalricRouter);
app.use("/gov", govRouter);
app.use("/patents", patentsRouter);
app.use("/calendar", calendarRouter);
app.use("/profiles", profileRouter);
app.use("/academy", academyRouter);
app.use("/canons", canonsRouter);

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
    next(createError(NOT_FOUND));
});

// Error handler.
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development.
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // Render the error page.
    res.status(err.status || INTERNAL_SERVER_ERROR);
    res.render("error");
});

// Listen, and tell the programmer where to find the website.
app.listen(app.get("port"), function () {
    console.log("App running at port number: " + app.get("port"));
    console.log(
        "If running locally, navigate to: http://localhost:" +
        app.get("port") +
        "/"
    );
});

// Exports.
module.exports = app;
