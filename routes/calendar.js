/*
This code handles tables retrieved from the database "as is".
*/

// Imports.
const express = require("express");

// Local imports.
const CalendarMaker = require("../lib/calendarmaker.js");

// Constants.
const router = express.Router();

// Return the home page.
router.get("/", function(req, res, next){
  var maker = new CalendarMaker();

  maker.finalise(req, res);
});

// Exports.
module.exports = router;
