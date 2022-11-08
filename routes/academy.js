/*
This code handles the various pages relating to the Royal Cyprian Academy.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");
const Scraper = require("../lib/scraper.js");

// Constants.
const router = express.Router();

// Return the page for the whole Academy.
router.get("/", function (req, res, next) {
    var scraper = new Scraper();

    scraper.scrapeAcademy(req, res);
});

// Handle the various faculty pages.
router.get("/faculty/:id", function (req, res, next) {
    var scraper = new Scraper();

    scraper.scrapeFaculty(req, res);
});

// Handle the various department pages.
router.get("/department/:id", function (req, res, next) {
    var scraper = new Scraper();

    scraper.scrapeFacultyDepartment(req, res);
});

// Exports.
module.exports = router;
