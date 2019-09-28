/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Albums page.
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
class HAlbumsMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = "Hosker's Albums";
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "albums", this);
  }
}

// Exports.
module.exports = HAlbumsMaker;
