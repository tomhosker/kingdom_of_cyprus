/*
Set up the login system.
*/

// Login imports.
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const signingin = require("./signingin");

// Configure the local strategy for use by Passport.
passport.use(new Strategy(
  function(username, password, cb) {
    signingin.users.findByUsername(username, function(err, user) {
      if(err) { return cb(err); }
      if(!user) { return cb(null, false); }
      if(user.password !== password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  signingin.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

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
const notFound = 404;
const internalServerError = 500;

const app = express();

// View engine setup.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
if(app.get("env") === "development") app.locals.pretty = true;

// Use application-level middleware for common functionality, including
// parsing and session handling.
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: false,
                                     saveUninitialized: false }));

// Initialise Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Initialise some other resources.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(favicon(__dirname+"/public/favicon.ico"));

// ROUTES.
app.use("/", indexRouter);
app.use("/stills",
        require("connect-ensure-login").ensureLoggedIn(),
        stillsRouter);
app.use("/asis",
        require("connect-ensure-login").ensureLoggedIn(),
        asisRouter);
app.use("/people",
        require("connect-ensure-login").ensureLoggedIn(),
        peopleRouter);
app.use("/territories",
        require("connect-ensure-login").ensureLoggedIn(),
        territorialRouter);
app.use("/chivalric",
        require("connect-ensure-login").ensureLoggedIn(),
        chivalricRouter);
app.use("/gov",
        require("connect-ensure-login").ensureLoggedIn(),
        govRouter);
app.use("/patents",
        require("connect-ensure-login").ensureLoggedIn(),
        patentsRouter);
app.use("/calendar",
        require("connect-ensure-login").ensureLoggedIn(),
        calendarRouter);
app.use("/profiles",
        require("connect-ensure-login").ensureLoggedIn(),
        profileRouter);
app.use("/academy",
        require("connect-ensure-login").ensureLoggedIn(),
        academyRouter);
app.use("/canons",
        require("connect-ensure-login").ensureLoggedIn(),
        canonsRouter);
app.get("/login",
        function(req, res){
          res.redirect("/");
        });
app.post("/login", 
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  });
app.get("/logout",
  function(req, res){
    req.logout();
    res.redirect("/");
  });

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
