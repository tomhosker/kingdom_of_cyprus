/*
This code handles tables retrieved from the database "as is".
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();
const scraper = new Scraper();

// Return the home page.
router.get("/:id", function(req, res, next){
  scraper.scrapeAsIs(req, res);
});

// Exports.
module.exports = router;
