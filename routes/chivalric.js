/*
This code routes the various pages which pertain to orders of chivalry.
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();

// Handle a request for a list of all chivalric orders.
router.get("/", function (req, res, next) {
    var scraper = new Scraper();

    scraper.scrapeAllChivalric(req, res);
});

// Handle a request for a Chivalric page.
router.get("/:id", function (req, res, next) {
    var scraper = new Scraper();

    scraper.scrapeChivalric(req, res);
});

// Exports.
module.exports = router;
