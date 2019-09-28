/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Cinema page.
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
class HCinemaMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = "Hosker's Cinema";
    this.bookI = this.data.bookI;
    this.bookII = this.data.bookII;
    this.bookIII = this.data.bookIII;
    this.bookIV = this.data.bookIV;
    this.bookV = this.data.bookV;
  }

  finalise(req, res)
  {
console.log(this);
    finaliser.protoRender(req, res, "cinema", this);
  }
}

// Exports.
module.exports = HCinemaMaker;
