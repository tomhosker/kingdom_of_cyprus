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

  // Replace links to His Majesty's profile with RED versions thereof.
  addRedLinks(input) {
    const reToReplace = /<a href="\/people\/rex">/g;
    const replacement = '<a class="red" href="/people/rex">';

    input = input.replace(reToReplace, replacement);

    return input;
  }

  // Get a string giving the Cyprian and Gregorian dates.
  getFootDate()
  {
    let cyprian = timings.getCyprian();
    let greg = timings.getMyGreg();
    let result = cyprian+" = "+greg;

    return result;
  }

  // Render, and deliver the page to the browser.
  protoRender(req, res, view, properties)
  {
    let that = this;

    properties.constants = constants;
    properties.footdate = this.getFootDate();
    res.render(view, properties, function(err, html){
      if (html) {
        html = that.fixApostrophes(html);
        html = that.addRedLinks(html);
        res.send(html);
      } else {
        res.render(view, properties);
      }
    });
  }
}

// Exports.
module.exports = Finaliser;
