/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Television page.
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
class HTelevisionMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = "Hosker's Television";
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "television", this);
  }
}

// Exports.
module.exports = HTelevisionMaker;
