/*
This code contains a class which defines various utility functions.
*/

// Local imports.
const constants = require("./constants.js");

// The class in question.
class CUtils {
    constructor() {}

    makePersonLink(shortTitle, code, style, rankTier) {
        let result = '<a href="/people/' + code + '">' + shortTitle + "</a>";

        if (code === constants.KING_CODE) {
            result = '<a href="/people/' + code + '">' + style + "</a>";
        } else if (
            (rankTier >= constants.MIN_RANK_TIER_FOR_ABSTRACT_STYLE) &&
            style
        ) {
            result = style + " " + result;
        }

        return result;
    }
}

// Exports.
module.exports = CUtils;
