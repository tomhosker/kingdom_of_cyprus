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

// Return the page for all the various canons.
router.get("/", function(req, res, next){
  var finaliser = new Finaliser();

  finaliser.protoRender(req, res, "canons", { title: "Hosker's Canons" });
});

// Return the page for Hosker's Almanack.
router.get("/almanack", function(req, res, next){
  var finaliser = new Finaliser();

  finaliser.protoRender(req, res, "almanack",
                        { title: "Hosker's Almanack" });
});

// Return the page for Hosker's Library.
router.get("/library", function(req, res, next){
  var scraper =  new Scraper();

  scraper.scrapeHLibrary(req, res);
});

// Return the page for Hosker's Catalogue.
router.get("/catalogue", function(req, res, next){
  var scraper =  new Scraper();

  scraper.scrapeHCatalogue(req, res);
});

// Return the page for Hosker's Cinema.
router.get("/cinema", function(req, res, next){
  var scraper =  new Scraper();

  scraper.scrapeHCinema(req, res);
});

// Return the page for Hosker's Television.
router.get("/television", function(req, res, next){
  var scraper =  new Scraper();

  scraper.scrapeHTelevision(req, res);
});

// Return the page for Hosker's Albums.
router.get("/albums", function(req, res, next){
  var scraper =  new Scraper();

  scraper.scrapeHAlbums(req, res);
});

// Return the page for Hosker's Anthems.
router.get("/anthems", function(req, res, next){
  var scraper =  new Scraper();

  scraper.scrapeHAnthems(req, res);
});

// Exports.
module.exports = router;
