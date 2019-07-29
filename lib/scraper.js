/*
This code holds a class which scrapes the required data from a database.
*/

// Imports.
const sqlite3 = require("sqlite3");

// Local imports.
const Finaliser = require("./finaliser.js");
const PersonMaker = require("./personmaker.js");
const DuchyMaker = require("./duchymaker.js");
const CountyMaker = require("./countymaker.js");
const BaronyMaker = require("./baronymaker.js");
const ManorMaker = require("./manormaker.js");

// Constants.
const pathToDB = "cyprus.db";
const pathToCanons = "canons.db";
const finaliser = new Finaliser();

// The class in question.
class Scraper
{
  constructor()
  {

  }

  scrapePerson(req, res)
  {
    var code = req.params.id;
    var page = new PersonScraper();

    page.fetchPerson(req, res, code);
  }

  scrapeKingdom(req, res)
  {
    var page = new KingdomScraper();
    var properties = { title: "Introduction to the Kingdom" };
    var view = "kingdom";

    page.fetchDuchies(req, res, view, properties);
  }

  scrapeDuchy(req, res)
  {
    var code = req.params.id;
    var page = new DuchyScraper();

    page.fetchDuchy(req, res, code);
  }

  scrapeCounty(req, res)
  {
    var code = req.params.id;
    var page = new CountyScraper();

    page.fetchCounty(req, res, code);
  }

  scrapeBarony(req, res)
  {
    var code = req.params.id;
    var page = new BaronyScraper();

    page.fetchBarony(req, res, code);
  }

  scrapeManor(req, res)
  {
    var code = req.params.id;
    var page = new ManorScraper();

    page.fetchManor(req, res, code);
  }
}

// Ronseal.
class PersonScraper
{
  constructor()
  {

  }

  fetchPerson(req, res, code)
  {
    var query = "SELECT * FROM Person WHERE code = ?;";
    var data = {};
    var db = new sqlite3.Database(pathToDB);
    var that = this;

    db.each(query, [code], function(err, extract){
      if(err) throw err;
      else if(data.length === 0) res.send("No entry with key = "+code);
      else
      {
        data.Person = extract;
        db.close();
        that.fetchPersonRanks(req, res, code, data);
      }
    });
  }

  fetchPersonRanks(req, res, code, data)
  {
    var query = "SELECT maleName, femaleName FROM Rank WHERE tier = ?;";
    var rankTier = data.Person.rankTier;
    var db = new sqlite3.Database(pathToDB);
    var that = this;

    db.each(query, [rankTier], function(err, extract){
      if(err) throw err;
      else if(data.length === 0) res.send("Bad rank tier: "+rankTier);
      else
      {
        data.Rank = extract;
        db.close();
        that.fetchPersonAccolades(req, res, code, data);
      }
    });
  }

  fetchPersonAccolades(req, res, code, data)
  {
    var query = "SELECT Accolade.name AS name, "+
                       "Accolade.chivalric AS chivalric "+
                "FROM Holds "+
                "JOIN Accolade ON Accolade.code = Holds.accolade "+
                "JOIN Chivalric ON Chivalric.code = Accolade.chivalric "+
                "WHERE person = ? "+
                "ORDER BY Accolade.tier, Chivalric.seniority;";
    var db = new sqlite3.Database(pathToDB);
    var personMaker;

    db.all(query, [code], function(err, extract){
      if(err) throw err;
      else if(data.length === 0) data.Holds = null;
      else data.Holds = extract;

      db.close();
      personMaker = new PersonMaker(data);
      personMaker.finalise(req, res);
    });
  }
}

// Ronseal.
class KingdomScraper
{
  constructor()
  {

  }

  fetchDuchies(req, res, view, properties)
  {
    var query = "SELECT Duchy.code AS code, Duchy.name AS name, "+
                       "Duchy.duke AS duke, "+
                       "Person.shortTitle AS dukeShortTitle, "+
                       "Person.style AS dukeStyle, "+
                       "Person.rankTier AS dukeRankTier "+
                "FROM Duchy "+
                "JOIN Person ON Person.code = Duchy.duke "+
                "ORDER BY seniority;";
    var db = new sqlite3.Database("cyprus.db");

    db.all(query, function(err, extract){
      if(err || extract.length === 0) throw err;
      properties.duchies = extract;
      finaliser.protoRender(req, res, view, properties);
    });
  }
}

// Ronseal.
class DuchyScraper
{
  constructor()
  {

  }

  fetchDuchy(req, res, code)
  {
    var query = "SELECT Duchy.*, "+
                       "Duke.shortTitle AS dukeShortTitle, "+
                       "Duke.style AS dukeStyle, "+
                       "Duke.rankTier AS dukeRankTier, "+
                       "Strategos.shortTitle AS strategosShortTitle, "+
                       "Strategos.style AS strategosStyle, "+
                       "Strategos.rankTier AS strategosRankTier "+
                "FROM Duchy "+
                "JOIN Person Duke on Duke.code = Duchy.duke "+
                "JOIN Person Strategos on "+
                  "Strategos.code = Duchy.strategos "+
                "WHERE Duchy.code = ?;";
    var db = new sqlite3.Database("cyprus.db");
    var data = {};
    var that = this;

    db.each(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.Duchy = extract;
      db.close();
      that.fetchCounties(req, res, code, data);
    });
  }

  fetchCounties(req, res, code, data)
  {
    var query = "SELECT County.*, "+
                       "Person.shortTitle AS earlShortTitle, "+
                       "Person.style AS earlStyle, "+
                       "Person.rankTier AS earlRankTier "+
                "FROM County "+
                "JOIN Person on Person.code = County.earl "+
                "WHERE County.duchy = ? "+
                "ORDER BY seniority;";
    var db = new sqlite3.Database("cyprus.db");
    var that = this;
    var maker;

    db.all(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.Counties = extract;
      db.close();

      maker = new DuchyMaker(data);
      maker.finalise(req, res);
    });
  }
}

// Ronseal.
class CountyScraper
{
  constructor()
  {

  }

  fetchCounty(req, res, code)
  {
    var query = "SELECT County.*, "+
                       "Earl.shortTitle AS earlShortTitle, "+
                       "Earl.style AS earlStyle, "+
                       "Earl.rankTier AS earlRankTier, "+
                       "Comes.shortTitle AS comesShortTitle, "+
                       "Comes.style AS comesStyle, "+
                       "Comes.rankTier AS comesRankTier "+
                "FROM County "+
                "JOIN Person Earl on Earl.code = County.earl "+
                "JOIN Person Comes on "+
                  "Comes.code = County.comes "+
                "WHERE County.code = ?;";
    var db = new sqlite3.Database("cyprus.db");
    var data = {};
    var that = this;

    db.each(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.County = extract;
      db.close();
      that.fetchBaronies(req, res, code, data);
    });
  }

  fetchBaronies(req, res, code, data)
  {
    var query = "SELECT Barony.*, "+
                       "Person.shortTitle AS baronShortTitle, "+
                       "Person.style AS baronStyle, "+
                       "Person.rankTier AS baronRankTier "+
                "FROM Barony "+
                "JOIN Person on Person.code = Barony.baron "+
                "WHERE Barony.county = ? "+
                "ORDER BY seniority;";
    var db = new sqlite3.Database("cyprus.db");
    var that = this;
    var maker;

    db.all(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.Baronies = extract;
      db.close();

      maker = new CountyMaker(data);
      maker.finalise(req, res);
    });
  }
}

// Ronseal.
class BaronyScraper
{
  constructor()
  {

  }

  fetchBarony(req, res, code)
  {
    var query = "SELECT Barony.*, "+
                       "Baron.shortTitle AS baronShortTitle, "+
                       "Baron.style AS baronStyle, "+
                       "Baron.rankTier AS baronRankTier, "+
                       "Patricius.shortTitle AS patriciusShortTitle, "+
                       "Patricius.style AS patriciusStyle, "+
                       "Patricius.rankTier AS patriciusRankTier "+
                "FROM Barony "+
                "JOIN Person Baron on Baron.code = Barony.baron "+
                "JOIN Person Patricius on "+
                  "Patricius.code = Barony.patricius "+
                "WHERE Barony.code = ?;";
    var db = new sqlite3.Database("cyprus.db");
    var data = {};
    var that = this;

    db.each(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.Barony = extract;
      db.close();
      that.fetchManors(req, res, code, data);
    });
  }

  fetchManors(req, res, code, data)
  {
    var query = "SELECT Manor.*, "+
                       "Person.shortTitle AS masterShortTitle, "+
                       "Person.style AS masterStyle, "+
                       "Person.rankTier AS masterRankTier "+
                "FROM Manor "+
                "JOIN Person on Person.code = Manor.master "+
                "WHERE Manor.barony = ? "+
                "ORDER BY seniority;";
    var db = new sqlite3.Database("cyprus.db");
    var that = this;
    var maker;

    db.all(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.Manors = extract;
      db.close();

      maker = new BaronyMaker(data);
      maker.finalise(req, res);
    });
  }
}

// Ronseal.
class ManorScraper
{
  constructor()
  {

  }

  fetchManor(req, res, code)
  {
    var query = "SELECT Manor.*, "+
                       "Master.shortTitle AS masterShortTitle, "+
                       "Master.style AS masterStyle, "+
                       "Master.rankTier AS masterRankTier "+
                "FROM Manor "+
                "JOIN Person Master on Master.code = Manor.master "+
                "WHERE Manor.code = ?;";
    var db = new sqlite3.Database("cyprus.db");
    var data = {};
    var that = this;
    var maker;

    db.each(query, [code], function(err, extract){
      if(err || extract.length === 0) throw err;
      data.Manor = extract;
      maker = new ManorMaker(data);
      maker.finalise(req, res);
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
