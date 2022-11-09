/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Cinema page.
*/

// Local imports.
const CUtils = require("./cutils.js");
const Finaliser = require("./finaliser.js");

// Constant objects.
const utils = new CUtils();
const finaliser = new Finaliser();

// The class in question.
class HCinemaMaker {
    constructor(data) {
        this.data = data;
        this.title = "Hosker's Cinema";
        this.bookI = this.data.bookI;
        this.bookII = this.data.bookII;
        this.bookIII = this.data.bookIII;
        this.bookIV = this.data.bookIV;
        this.bookV = this.data.bookV;
        this.deuterocanon = this.data.deuterocanon;
        this.adaptations = this.data.adaptations;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "cinema", this);
    }
}

// Exports.
module.exports = HCinemaMaker;
