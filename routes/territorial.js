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
  var properties = { title: "Introduction to the Kingdom" };
  scraper.fetchDuchies(req, res, "kingdom", properties);
//  res.render("kingdom", { title: "Introduction to the Kingdom" })
});

function fetch(req, res)
{
  var query = "SELECT suffix FROM Smeg WHERE id = 1;";
  var theTitle = "Smeg"

  db.each(query, function(err, extract){
    if(err) throw err;
    theTitle = theTitle+extract.suffix;
    res.render("smeg", { title: theTitle });
  });
}

// Exports.
module.exports = router;
