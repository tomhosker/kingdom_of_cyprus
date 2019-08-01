/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Government page.
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
class GovMaker
{
  constructor(data)
  {
    this.data = data;
    this.title = "HM Government";
    this.chancellor = getOfficer(data.chancellorShortTitle,
                                 data.chancellor,
                                 data.chancellorStyle,
                                 data.chancellorRankTier);
    this.marshal = getOfficer(data.marshalShortTitle,
                              data.marshal,
                              data.marshalStyle,
                              data.marshalRankTier);
    this.steward = getOfficer(data.stewardShortTitle,
                              data.steward,
                              data.stewardStyle,
                              data.stewardRankTier);
    this.remembrancer = getOfficer(data.remembrancerShortTitle,
                                   data.remembrancer,
                                   data.remembrancerStyle,
                                   data.remembrancerRankTier);
    this.ecclesiarch = getOfficer(data.ecclesiarchShortTitle,
                                  data.ecclesiarch,
                                  data.ecclesiarchStyle,
                                  data.ecclesiarchRankTier);
    this.masterOfOffices = getOfficer(data.masterOfOfficesShortTitle,
                                      data.masterOfOffices,
                                      data.masterOfOfficesStyle,
                                      data.masterOfOfficesRankTier);
    this.masterOfHorse = getOfficer(data.masterOfHorseShortTitle,
                                    data.masterOfHorse,
                                    data.masterOfHorseStyle,
                                    data.masterOfHorseRankTier);
    this.masterOfTheRolls = getOfficer(data.masterOfTheRollsShortTitle,
                                       data.masterOfTheRolls,
                                       data.masterOfTheRollsStyle,
                                       data.masterOfTheRollsRankTier);
    this.masterOfTheBedchamber = getOfficer(
                                   data.masterOfTheBedchamberShortTitle,
                                   data.masterOfTheBedchamber,
                                   data.masterOfTheBedchamberStyle,
                                   data.masterOfTheBedchamberRankTier);
    this.masterOfAlms = getOfficer(data.masterOfAlmsShortTitle,
                                   data.masterOfAlms,
                                   data.masterOfAlmsStyle,
                                   data.masterOfAlmsRankTier);
    this.regent = getOfficer(data.regentShortTitle,
                             data.regent,
                             data.regentStyle,
                             data.regentRankTier);
  }

  finalise(req, res)
  {
    finaliser.protoRender(req, res, "government", this);
  }
}

function getOfficer(shortTitle, code, style, rankTier)
{
  var result = "<em>None</em>";

  if(code === null) return result;

  result = utils.makePersonLink(shortTitle, code, style, rankTier);

  return result;
}

// Exports.
module.exports = GovMaker;
