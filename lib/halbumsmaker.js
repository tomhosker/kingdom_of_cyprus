/*
This code contains a class which takes in data from the scraper, and outputs
the properties of the Hosker's Albums page.
*/

// Local imports.
const CUtils = require("./cutils.js");
const Finaliser = require("./finaliser.js");

// Constant objects.
const utils = new CUtils();
const finaliser = new Finaliser();

// The class in question.
class HAlbumsMaker {
    constructor(data) {
        this.data = data;
        this.sorted = [];
        this.unsorted = [];
        this.title = "Hosker's Albums";
        this.separate();
    }

    separate() {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].rank > 0) this.sorted.push(this.data[i]);
            else this.unsorted.push(this.data[i]);
        }
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "albums", this);
    }
}

// Exports.
module.exports = HAlbumsMaker;
