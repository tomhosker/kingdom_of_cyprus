/*
This code routes the Patents page.
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();

// Handle a request for the Patent page.
router.get("/", function (req, res, next) {
    var scraper = new Scraper();

    scraper.scrapePatent(req, res);
});

// Exports.
module.exports = router;
