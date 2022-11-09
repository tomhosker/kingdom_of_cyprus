/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Faculty page.
*/

// Local imports.
const CUtils = require("./cutils.js");
const Timings = require("./timings.js");
const Finaliser = require("./finaliser.js");

// Constant objects.
const utils = new CUtils();
const timings = new Timings();
const finaliser = new Finaliser();

// The class in question.
class FacultyMaker {
    constructor(data) {
        this.data = data;
        this.code = this.data.faculty[0].code;
        this.title = this.data.faculty[0].name;
        this.proViceChancellor = this.getProViceChancellor();
        this.arms = this.data.faculty[0].arms;
        this.description = this.data.faculty[0].description;
        this.departments = this.data.departments;
    }

    getProViceChancellor() {
        let result;

        if (!this.data.faculty[0].proViceChancellor) return null;

        result = utils.makePersonLink(
            this.personShortTitle,
            this.personCode,
            this.personStyle,
            this.personRankTier
        );

        return result;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "faculty", this);
    }
}

// Exports.
module.exports = FacultyMaker;
