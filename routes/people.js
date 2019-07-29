/*
This code routes the various pages which pertain to a territory.
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();
const scraper = new Scraper();

// Handle a request for an introduction to the Kingdom.
router.get("/:id", function(req, res, next){
  scraper.scrapePerson(req, res);
});

// Exports.
module.exports = router;
