/*
This code handles the site's pseudo-static pages.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();
const finaliser = new Finaliser();

// Return a "still" page.
router.get("/:id", function(req, res, next){
  var view = req.params.id;
  var theTitle = getTitle(view);

  finaliser.protoRender(req, res, view, { title: theTitle });
});

// Converts the view name into a page title.
function getTitle(view)
{
  if(view === "strategoi") return "Strategoi, Comites and Patricii";
  else return "Could not find title";
}

// Exports.
module.exports = router;
