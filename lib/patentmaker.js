/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Government page.
*/

// Local imports.
const Constants = require("./constants.js");
const CUtils = require("./cutils.js");
const Timings = require("./timings.js");
const Finaliser = require("./finaliser.js");

// Constants.
const constants = new Constants();
const utils = new CUtils();
const timings = new Timings();
const finaliser = new Finaliser();

// The class in question.
class PatentMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = "Patents";
    this.patents = this.getPatents();
  }

  getPatents()
  {
    var result = [];
    var row, name, date;

    for(var i = 0; i < this.data.length; i++)
    {
      name = "<i><a href=\"/letterspatent/"+this.data[i].id+".pdf\">"+
             this.data[i].name+"</a></i>";
      date = timings.packCyprianDate(this.data[i].day, this.data[i].month,
                                     this.data[i].monarchCode,
                                     this.data[i].yearInMonarchReign);
      row = [name, date];
      result.push(row);
    }

    return result;
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "patents", this);
  }
}

// Exports.
module.exports = PatentMaker;
