/*
This code holds a class which scrapes the required data from a database.
*/

// Imports.
const sqlite3 = require("sqlite3");

// Local imports.
const Finaliser = require("./finaliser.js");

// The class in question.
class Scraper
{
  constructor()
  {
    this.db = new sqlite3.Database("cyprus.db");
    this.canons = new sqlite3.Database("canons.db");
    this.finaliser = new Finaliser();
  }

  fetchDuchies(res, req, view, properties)
  {
    var query = "SELECT name AS Name, duke AS Duke "+
                "FROM Duchy "+
                "ORDER BY Seniority;";
    var headings, rows;
    var that = this;

    this.db.all(query, function(err, data){
      if(err || data.length === 0) throw err;
      headings = Object.keys(data[0]);
      rows = dictToRows(data);
      properties.duchiesHeadings = headings;
      properties.duchies = rows;
      that.finaliser.protoRender(res, req, view, properties);
    });
  }
}

// Extract the rows from a list of dictionaries.
function dictToRows(list)
{
  var result = [];
  var row = [];

  for(var i = 0; i < list.length; i++)
  {
    row = Object.values(list[i]);
    result.push(row);
  }

  return result;
}

// Exports.
module.exports = Scraper;
