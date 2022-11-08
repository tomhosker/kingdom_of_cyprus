/*
This code contains a class which defines various utility functions.
*/

// Local imports.
const Constants = require("./constants.js");

// Constants.
const constants = new Constants();

// The class in question.
class CUtils {
    constructor() {}

    makePersonLink(shortTitle, code, style, rankTier) {
        var result = '<a href="/people/' + code + '">' + shortTitle + "</a>";

        if (
            rankTier >= constants.minRankTierForAbstractStyle &&
            style !== null
        ) {
            result = style + " " + result;
        }

        return result;
    }
}

// Exports.
module.exports = CUtils;
