/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Person page.
*/

// Local imports.
const Finaliser = require("./finaliser.js");

// Constants.
const finaliser = new Finaliser();
const male = 1,
    female = 0;
const earlRank = 16,
    baronRank = 14,
    viceMasterRank = 11;

// The class in question.
class PersonMaker {
    constructor(data) {
        this.data = data;
        this.style = data.Person.style;
        this.shortTitle = data.Person.shortTitle;
        this.surname = data.Person.surname;
        this.forename = data.Person.forename;
        this.addressedAs = data.Person.addressedAs;
        this.shortishTitle = data.Person.shortishTitle;
        this.bio = data.Person.bio;
        this.cyprianLegalName = data.Person.cyprianLegalName;
        this.arms = data.Person.arms;
        this.family = data.Person.family;
        this.title = this.getTitle();
        this.boxType = this.getBoxType();
        this.rank = this.getRank();
        this.accolades = this.getAccolades();
        this.refTitle = this.getRefTitle();
    }

    getTitle() {
        let result = this.shortishTitle || this.shortTitle;

        return result;
    }

    getBoxType() {
        let result = "person";
        let holds = this.data.Holds;

        if (this.data.Person.rankTier >= baronRank) result = "noble";
        else if (this.data.Person.rankTier >= viceMasterRank) {
            result = "important";
        }

        for (let i = 0; i < holds.length; i++) {
            if (holds[i].chivalric === "cross") {
                result = "red";
                break;
            }
        }

        return result;
    }

    getRank() {
        let result;

        if (this.data.Person.gender === male) result = this.data.Rank.maleName;
        else result = this.data.Rank.femaleName;

        return result;
    }

    getAccolades() {
        let result, accolade;
        let accolades = [];
        let links = [];
        let holds = this.data.Holds;

        for (let i = 0; i < holds.length; i++) {
            if (holds[i].link in links) {
                accolade = holds[i].name;
            } else {
                accolade =
                    '<a href="/chivalric/' +
                    holds[i].chivalric +
                    '">' +
                    holds[i].name +
                    "</a>";
                links.push(holds[i].link);
            }

            accolades.push(accolade);
        }

        result = accolades.join(", ");

        return result;
    }

    getRefTitle() {
        if (this.data.Person.rankTier >= earlRank) return this.style;

        return this.shortTitle;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "person", this);
    }
}

// Exports.
module.exports = PersonMaker;
