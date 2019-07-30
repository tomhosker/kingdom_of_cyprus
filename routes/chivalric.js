/*
This code routes the various pages which pertain to orders of chivalry.
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();
const scraper = new Scraper();

// Handle a request for an Order page.
router.get("/:id", function(req, res, next){
  scraper.scrapeChivalric(req, res);
});

// Exports.
module.exports = router;
