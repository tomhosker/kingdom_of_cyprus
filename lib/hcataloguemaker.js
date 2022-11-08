/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Catalogue page.
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
class HCatalogueMaker {
    constructor(data) {
        this.data = data;
        this.title = "Hosker's Catalogue";
        this.sacredLanguages = this.data.sacredLanguages;
        this.poetry = this.data.poetry;
        this.poetryRelated = this.data.poetryRelated;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "catalogue", this);
    }
}

// Exports.
module.exports = HCatalogueMaker;
