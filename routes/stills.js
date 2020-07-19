/*
This code handles the site's pseudo-static pages.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();

// Return a "still" page.
router.get("/:id", function(req, res, next){
  var finaliser = new Finaliser();
  var view = req.params.id;
  var theTitle = getTitle(view);

  finaliser.protoRender(req, res, view, { title: theTitle });
});

// Converts the view name into a page title.
function getTitle(view)
{
  if(view === "tools") return "Tools";
  else if(view === "lists") return "Lists";
  else if(view === "lieutenants") return "Lords-Warden and -Lieutenant";
  else if(view === "other_projects") return "Other Projects";
  else return "Could not find title";
}

// Exports.
module.exports = router;
