/*
This code routes the various pages which pertain to a territory.
*/

// Imports.
const express = require("express");

// Local imports.
const Scraper = require("../lib/scraper.js");
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();

// Handle a request for all territories.
router.get("/", function(req, res, next){
  var finaliser = new Finaliser();
  var properties = { title: "Hierarchy of Territories" };

  finaliser.protoRender(req, res, "territorieshierarchy", properties);
});

// Handle for a request for an introduction to the Kingdom.
router.get("/kingdom", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeKingdom(req, res);
});

// Handle for a request for a list of Duchies.
router.get("/duchies", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeAllDuchy(req, res);
});

// Handle for a request for a Duchy page.
router.get("/duchies/:id", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeDuchy(req, res);
});

// Handle for a request for a list of Counties.
router.get("/counties", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeAllCounty(req, res);
});

// Handle for a request for a County page.
router.get("/counties/:id", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeCounty(req, res);
});

// Handle for a request for a list of Baronies.
router.get("/baronies", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeAllBarony(req, res);
});

// Handle for a request for a Barony page.
router.get("/baronies/:id", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeBarony(req, res);
});

// Handle for a request for a list of Manors.
router.get("/manors", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeAllManor(req, res);
});

// Handle for a request for a Manor page.
router.get("/manors/:id", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeManor(req, res);
});

// Exports.
module.exports = router;
