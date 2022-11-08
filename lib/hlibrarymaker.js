/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Library page.
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
class HLibraryMaker {
    constructor(data) {
        this.data = data;
        this.title = "Hosker's Library";
        this.goldenPoets = this.data.goldenPoets;
        this.otherPoets = this.data.otherPoets;
        this.anthologies = this.data.anthologies;
        this.poetryRelated = this.data.poetryRelated;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "library", this);
    }
}

// Exports.
module.exports = HLibraryMaker;
