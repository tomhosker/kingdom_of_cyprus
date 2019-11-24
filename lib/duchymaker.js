/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Duchy page.
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
class DuchyMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = data.Duchy.name;
    this.name = data.Duchy.name;
    this.description = data.Duchy.description;
    this.duke = this.getDuke();
    this.lordWarden = this.getLordWarden();
    this.arms = data.Duchy.arms;
    this.description = data.Duchy.description;
    this.counties = this.getCounties();
  }

  getDuke()
  {
    var result = utils.makePersonLink(this.data.Duchy.dukeShortTitle,
                                      this.data.Duchy.duke,
                                      this.data.Duchy.dukeStyle,
                                      this.data.Duchy.dukeRankTier);

    return result;
  }

  getLordWarden()
  {
    var result = utils.makePersonLink(
                   this.data.Duchy.lordWardenShortTitle,
                   this.data.Duchy.lordWarden,
                   this.data.Duchy.lordWardenStyle,
                   this.data.Duchy.lordWardenRankTier);

    return result;
  }

  getCounties()
  {
    var result = [];
    var row, county, earl;

    for(var i = 0; i < this.data.Counties.length; i++)
    {
      earl = utils.makePersonLink(this.data.Counties[i].earlShortTitle,
                                  this.data.Counties[i].earl,
                                  this.data.Counties[i].earlStyle,
                                  this.data.Counties[i].earlRankTier);
      county = "<a href=\"/territories/counties/"+
                 this.data.Counties[i].code+"\">"+
                 this.data.Counties[i].name+"</a>";
      row = [county, earl];
      result.push(row);
    }

    return result;
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "duchy", this);
  }
}

// Exports.
module.exports = DuchyMaker;
