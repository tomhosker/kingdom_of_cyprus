/*
This code contains a class which outputs the properties of a Calendar page.
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
class CalendarMaker {
    constructor() {
        this.title = "Calendars of the Kingdom";
        this.utcTimestamp = timings.getUTCTimestamp();
        this.greg = timings.getMyGreg();
        this.cyprian = timings.getCyprian();
        this.sacred = timings.getSacred();
        this.sacredColour = timings.getSacredColour();
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "calendar", this);
    }
}

// Exports.
module.exports = CalendarMaker;
