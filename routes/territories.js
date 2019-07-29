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
router.get("/kingdom", function(req, res, next){
  scraper.scrapeKingdom(req, res);
});

// Handle a request for a Duchy page.
router.get("/duchies/:id", function(req, res, next){
  scraper.scrapeDuchy(req, res);
});

// Handle a request for a County page.
router.get("/counties/:id", function(req, res, next){
  scraper.scrapeCounty(req, res);
});

// Handle a request for a Barony page.
router.get("/baronies/:id", function(req, res, next){
  scraper.scrapeBarony(req, res);
});

// Handle a request for a Manor page.
router.get("/manors/:id", function(req, res, next){
  scraper.scrapeManor(req, res);
});

// Exports.
module.exports = router;
