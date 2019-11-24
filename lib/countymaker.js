/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a County page.
*/

// Local imports.
const Constants = require("./constants.js");
const CUtils = require("./cutils.js");
const Finaliser = require("./finaliser.js");

// Constants.
const constants = new Constants();
const utils = new CUtils();
const finaliser = new Finaliser();

// The class in question.
class CountyMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = data.County.name;
    this.name = data.County.name;
    this.description = data.County.description;
    this.earl = this.getEarl();
    this.lordLieutenant = this.getLordLieutenant();
    this.arms = data.County.arms;
    this.description = data.County.description;
    this.baronies = this.getBaronies();
  }

  getEarl()
  {
    var result = utils.makePersonLink(this.data.County.earlShortTitle,
                                      this.data.County.earl,
                                      this.data.County.earlStyle,
                                      this.data.County.earlRankTier);

    return result;
  }

  getLordLieutenant()
  {
    var result = utils.makePersonLink(
                   this.data.County.lordLieutenantShortTitle,
                   this.data.County.lordLieutenant,
                   this.data.County.lordLieutenantStyle,
                   this.data.County.lordLieutenantRankTier);

    return result;
  }

  getBaronies()
  {
    var result = [];
    var row, barony, baron;

    for(var i = 0; i < this.data.Baronies.length; i++)
    {
      baron = utils.makePersonLink(this.data.Baronies[i].baronShortTitle,
                                   this.data.Baronies[i].baron,
                                   this.data.Baronies[i].baronStyle,
                                   this.data.Baronies[i].baronRankTier);
      barony = "<a href=\"/territories/baronies/"+
                 this.data.Baronies[i].code+"\">"+
                 this.data.Baronies[i].name+"</a>";
      row = [barony, baron];
      result.push(row);
    }

    return result;
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "county", this);
  }
}

// Exports.
module.exports = CountyMaker;
