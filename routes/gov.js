/*
This code routes the Government page.
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();

// Delivers the Government page.
router.get("/", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeGov(req, res);
});

// Exports.
module.exports = router;
