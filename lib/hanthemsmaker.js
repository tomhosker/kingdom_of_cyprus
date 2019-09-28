/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Anthems page.
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
class HAnthemsMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = "Hosker's Anthems";
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "anthems", this);
  }
}

// Exports.
module.exports = HAnthemsMaker;
