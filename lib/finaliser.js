/*
This code contains a class which handles any final, universal touches to the
page before it's passed to the browser.
*/

// Local imports.
const Timings = require("./timings.js");
const Constants = require("./constants.js");

// Constants.
const timings = new Timings();
const constants = new Constants();

// The class in question.
class Finaliser
{
  constructor()
  {

  }

  // Ronseal.
  fixApostrophes(input)
  {
    while(input.indexOf("`") >= 0)
    {
      input = input.replace("`", "&lsquo;");
    }
    while(input.indexOf("'") >= 0)
    {
      input = input.replace("'", "&rsquo;");
    }
    return input;
  }

  // Ronseal.
  fixDashes(input)
  {
    while(input.indexOf("---") >= 0)
    {
      input = input.replace("---", "&mdash;");
    }
    while(input.indexOf("--") >= 0)
    {
      input = input.replace("--", "&ndash;");
    }
    return input;
  }

  // Get a string giving the Gregorian date.
  getGregDate()
  {
    var result = timings.getMyGreg();
    return result;
  }

  // Render, and deliver the page to the browser.
  protoRender(req, res, view, properties)
  {
    var that = this;

    properties.constants = constants;
    properties.footdate = this.getGregDate();
    res.render(view, properties, function(err, html){
      if(html === undefined)
      {
        res.render(view, properties);
      }
      else
      {
        html = that.fixApostrophes(html);
        html = that.fixDashes(html);
        res.send(html);
      }
    });
  }
}

// Exports.
module.exports = Finaliser;
