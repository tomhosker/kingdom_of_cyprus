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
const scraper = new Scraper();
const finaliser = new Finaliser();

// Handle a request for an introduction to the Kingdom.
router.get("/:id", function(req, res, next){
  var code = req.params.id;

  if(code === "rex") deliverRex(req, res);
  else scraper.scrapePerson(req, res);
});

// Delivers His Majesty's profile page.
function deliverRex(req, res)
{
  var properties = { title: "His Majesty The King" };

  finaliser.protoRender(req, res, "rex", properties);
}

// Exports.
module.exports = router;
