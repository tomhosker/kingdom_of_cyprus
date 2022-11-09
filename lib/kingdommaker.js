/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Kingdom page.
*/

// Local imports.
const CUtils = require("./cutils.js");
const Finaliser = require("./finaliser.js");

// Local constants.
const utils = new CUtils();
const finaliser = new Finaliser();

// The class in question.
class KingdomMaker {
    constructor(data) {
        this.data = data;
        this.title = "Introduction to the Kingdom";
        this.duchies = this.getDuchies();
    }

    getDuchies() {
        var result = [];
        var row, duchy, duke;

        for (var i = 0; i < this.data.Duchies.length; i++) {
            duke = utils.makePersonLink(
                this.data.Duchies[i].dukeShortTitle,
                this.data.Duchies[i].duke,
                this.data.Duchies[i].dukeStyle,
                this.data.Duchies[i].dukeRankTier
            );
            duchy =
                '<a href="/territories/duchies/' +
                this.data.Duchies[i].code +
                '">' +
                this.data.Duchies[i].name +
                "</a>";
            row = [duchy, duke];
            result.push(row);
        }

        return result;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "kingdom", this);
    }
}

// Exports.
module.exports = KingdomMaker;
