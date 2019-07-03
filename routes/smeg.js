var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3");
const db = new sqlite3.Database("data.db");

/* Do something vaguely interesting. */
router.get("/", function(req, res, next){
  fetch(req, res)
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

module.exports = router;
