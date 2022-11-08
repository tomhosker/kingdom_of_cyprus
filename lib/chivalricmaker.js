/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Chivalric page.
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
class ChivalricMaker {
    constructor(data) {
        this.data = data;
        this.title = data.Chivalric.name;
        this.name = data.Chivalric.name;
        this.style = data.Chivalric.style;
        this.description = data.Chivalric.description;
        this.master = this.getMaster();
        this.arms = data.Chivalric.arms;
        this.accolades = this.getAccolades();
        this.members = this.getMembers();
        this.boxType = this.getBoxType();
    }

    getMaster() {
        var result;

        if (this.data.Chivalric.master === null) result = null;
        else {
            result = utils.makePersonLink(
                this.data.Chivalric.masterShortTitle,
                this.data.Chivalric.master,
                this.data.Chivalric.masterStyle,
                this.data.Chivalric.masterRankTier
            );
        }

        return result;
    }

    getAccolades() {
        var result = "";

        for (var i = 0; i < this.data.Accolade.length; i++) {
            result = result + this.data.Accolade[i].name;

            if (i !== this.data.Accolade.length - 1) result = result + ", ";
        }

        return result;
    }

    getMembers() {
        var accoladeName = null;
        var holder = null;
        var holders = [];
        var result_item = null;
        var result = [];
        var raw = this.data.Holds;

        for (var i = 0; i < raw.length; i++) {
            holder = utils.makePersonLink(
                raw[i].shortTitle,
                raw[i].person,
                raw[i].style,
                raw[i].rankTier
            );

            if (i === 0) {
                accoladeName = raw[i].name;
                holders = [holder];
            } else if (raw[i].name !== accoladeName) {
                result_item = { accolade: accoladeName, holders: holders };
                result.push(holdersDeepCopy(result_item));
                accoladeName = raw[i].name;
                holders = [holder];
            } else holders.push(holder);
        }
        result_item = { accolade: accoladeName, holders: holders };
        result.push(holdersDeepCopy(result_item));

        return result;
    }

    getBoxType() {
        var result = "chivalric";

        if (this.data.Chivalric.code === "cross") result = "cross";

        return result;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "chivalric", this);
    }
}

function holdersDeepCopy(item) {
    var result = {};
    var newAccolade = item.accolade;
    var newHolders = "";

    for (var i = 0; i < item.holders.length; i++) {
        newHolders = newHolders + item.holders[i];

        if (i !== item.holders.length - 1) newHolders = newHolders + " &bull; ";
    }

    result.accolade = newAccolade;
    result.holders = newHolders;

    return result;
}

// Exports.
module.exports = ChivalricMaker;
