/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Barony page.
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
class BaronyMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = data.Barony.name;
    this.name = data.Barony.name;
    this.description = data.Barony.description;
    this.baron = this.getBaron();
    this.patricius = this.getPatricius();
    this.arms = data.Barony.arms;
    this.description = data.Barony.description;
    this.manors = this.getManors();
  }

  getBaron()
  {
    var result = utils.makePersonLink(this.data.Barony.baronShortTitle,
                                      this.data.Barony.baron,
                                      this.data.Barony.baronStyle,
                                      this.data.Barony.baronRankTier);

    return result;
  }

  getPatricius()
  {
    var result = utils.makePersonLink(this.data.Barony.patriciusShortTitle,
                                      this.data.Barony.patricius,
                                      this.data.Barony.patriciusStyle,
                                      this.data.Barony.patriciusRankTier);

    return result;
  }

  getManors()
  {
    var result = [];
    var row, manor, master;

    for(var i = 0; i < this.data.Manors.length; i++)
    {
      master = utils.makePersonLink(this.data.Manors[i].masterShortTitle,
                                    this.data.Manors[i].master,
                                    this.data.Manors[i].masterStyle,
                                    this.data.Manors[i].masterRankTier);
      manor = "<a href=\"/territories/manors/"+
                this.data.Manors[i].code+"\">"+
                this.data.Manors[i].name+"</a>";
      row = [manor, master];
      result.push(row);
    }

    return result;
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "barony", this);
  }
}

// Exports.
module.exports = BaronyMaker;
