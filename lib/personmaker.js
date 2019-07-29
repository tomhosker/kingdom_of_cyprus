/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Person page.
*/

// Local imports.
const Finaliser = require("./finaliser.js");

// Constants.
const finaliser = new Finaliser();
const male = 1, female = 0;
const earlRank = 16, baronRank = 14, viceMasterRank = 11;

// The class in question.
class PersonMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = this.getTitle();
    this.boxType = this.getBoxType();
    this.style = data.Person.style;
    this.shortTitle = data.Person.shortTitle;
    this.profilePhoto = data.Person.profilePhoto;
    this.otherNames = data.Person.otherNames;
    this.surname = data.Person.surname;
    this.forename = data.Person.forename;
    this.rank = this.getRank();
    this.addressedAs = data.Person.addressedAs;
    this.shortishTitle = data.Person.shortishTitle;
    this.bio = data.Person.bio;
    this.cyprianLegalName = data.Person.cyprianLegalName;
    this.accolades = this.getAccolades();
    this.arms = data.Person.arms;
    this.refTitle = this.getRefTitle();
    this.otherData = data.Person.otherData;
  }

  getTitle()
  {
    if(this.data.Person.shortishTitle === null)
    {
      return this.data.Person.shortTitle;
    }
    else return this.data.Person.shortishTitle;
  }

  getBoxType()
  {
    var result = "person";
    var holds = this.data.Holds;

    if(this.data.Person.rankTier >= baronRank) result = "noble";
    else if(this.data.Person.rankTier >= viceMasterRank)
    {
      result = "important";
    }

    for(var i = 0; i < holds.length; i++)
    {
      if(holds[i].chivalric === "cross")
      {
        result = "red";
        break;
      }
    }

    return result;
  }

  getRank()
  {
    var result;

    if(this.data.Person.gender === male) result = this.data.Rank.maleName;
    else result = this.data.Rank.femaleName;

    return result;
  }

  getAccolades()
  {
    var result = "";
    var links = [];
    var linkStart = "../chivalric/";
    var holds = this.data.Holds;

    for(var i = 0; i < holds.length; i++)
    {
      if(holds[i].link in links)
      {
        result = result+holds[i].name;
      }
      else
      {
        result = result+"<a href=\""+linkStart+holds[i].chivalric+"\">"+
                 holds[i].name+"</a>";
        links.push(holds[i].chivalric);
      }

      if(i === holds.length-1) result = result+".";
      else result = result+", ";
    }

    return result;
  }

  getRefTitle()
  {
    if(this.data.Person.rankTier >= earlRank) return this.data.Person.style;
    else return this.data.Person.shortTitle;
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "person", this);
  }
}

// Exports.
module.exports = PersonMaker;
