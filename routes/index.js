/*
This code handles the site's home page.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();

// Return the home page.
router.get("/", function(req, res, next){
  var finaliser = new Finaliser();
  var isLoggedIn = true;

  if(req.user === undefined) isLoggedIn = false;

  finaliser.protoRender(req, res, "index",
                        { title: "Welcome", loggedIn: isLoggedIn });
});

// Exports.
module.exports = router;
