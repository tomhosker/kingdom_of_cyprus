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

// Handle a request for a list of all people on the database.
router.get("/", function(req, res, next){
  var scraper = new Scraper();

  scraper.scrapeAllPerson(req, res);
});

// Handle a request for a person's page.
router.get("/:id", function(req, res, next){
  var scraper = new Scraper();
  var code = req.params.id;

  if(code === "rex") deliverRex(req, res);
  else scraper.scrapePerson(req, res);
});

// Delivers His Majesty's profile page.
function deliverRex(req, res)
{
  var finaliser = new Finaliser();
  var properties = { title: "His Majesty The King" };

  finaliser.protoRender(req, res, "rex", properties);
}

// Exports.
module.exports = router;
