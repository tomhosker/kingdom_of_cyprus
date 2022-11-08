/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Academy page.
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
class AcademyMaker {
    constructor(data) {
        this.data = data;
        this.title = "Royal Cyprian Academy";
        this.chancellor = null;
        this.viceChancellor = null;
        this.arms = this.getArms();
        this.faculties = this.data.faculties;
        this.extractLeadership();
    }

    getArms() {
        var result = null;

        for (var i = 0; i < this.data.academy.length; i++) {
            if (this.data.academy[i].property === "arms") {
                result = this.data.academy[i].value;
            }
        }

        return result;
    }

    extractLeadership() {
        var leadership = this.data.leadership;
        var chancellor = {};
        var viceChancellor = {};
        var noChancellorFlag = true;
        var noViceChancellorFlag = true;

        for (var i = 0; i < leadership.length; i++) {
            if (leadership[i].property === "chancellor") {
                noChancellorFlag = false;
                chancellor.code = leadership[i].personCode;
                chancellor.style = leadership[i].personStyle;
                chancellor.shortTitle = leadership[i].personShortTitle;
                chancellor.rankTier = leadership[i].personRankTier;
            } else if (leadership[i].property === "viceChancellor") {
                noViceChancellorFlag = false;
                viceChancellor.code = leadership[i].personCode;
                viceChancellor.style = leadership[i].personStyle;
                viceChancellor.shortTitle = leadership[i].personShortTitle;
                viceChancellor.rankTier = leadership[i].personRankTier;
            }
        }

        if (noChancellorFlag === false) {
            this.chancellor = utils.makePersonLink(
                chancellor.shortTitle,
                chancellor.code,
                chancellor.style,
                chancellor.rankTier
            );
        }
        if (noViceChancellorFlag === false) {
            this.viceChancellor = utils.makePersonLink(
                viceChancellor.shortTitle,
                viceChancellor.code,
                viceChancellor.style,
                viceChancellor.rankTier
            );
        }
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "academy", this);
    }
}

// Exports.
module.exports = AcademyMaker;
