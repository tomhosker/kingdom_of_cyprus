/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Manor page.
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
class ManorMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = data.Manor.name;
    this.name = data.Manor.name;
    this.description = data.Manor.description;
    this.master = this.getMaster();
    this.arms = data.Manor.arms;
  }

  getMaster()
  {
    var result = utils.makePersonLink(this.data.Manor.masterShortTitle,
                                      this.data.Manor.master,
                                      this.data.Manor.masterStyle,
                                      this.data.Manor.masterRankTier);

    return result;
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "manor", this);
  }
}

// Exports.
module.exports = ManorMaker;
