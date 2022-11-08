/*
This code contains a class which takes in data from the scraper, and outputs
the properties of a Department page.
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
class FacultyDepartmentMaker {
    constructor(data) {
        this.data = data;
        this.title = this.data.department[0].name;
        this.professor = this.getProfessor();
        this.faculty = this.getFaculty();
        this.arms = this.data.department[0].arms;
        this.library = this.getLibrary();
        this.description = this.data.department[0].description;
    }

    getProfessor() {
        var result = null;

        if (this.data.department[0].professor !== null) {
            result = utils.makePersonLink(
                this.data.department[0].personShortTitle,
                this.data.department[0].personCode,
                this.data.department[0].personStyle,
                this.data.department[0].personRankTier
            );
        }

        return result;
    }

    getFaculty() {
        var result = null;

        if (this.data.department[0].faculty !== null) {
            result =
                '<a href="/academy/faculty/' +
                this.data.department[0].facultyCode +
                '">' +
                this.data.department[0].facultyName +
                "</a>";
        }

        return result;
    }

    getLibrary() {
        var code = this.data.department[0].code;

        if (code === "theology") return getTheologyLibrary(this.data.Book);
        else if (code === "philosophy") {
            return getPhilosophyLibrary(this.data.Book);
        } else return null;
    }

    finalise(req, res) {
        finaliser.protoRender(req, res, "facultydepartment", this);
    }
}

// A helper function. This constructs an object for the library of the
// Department of Theology.
function getTheologyLibrary(table) {
    var result = {};
    var sacredLanguages = {};
    var hebrew = [],
        greek = [],
        latin = [],
        translations = [];
    var generalTheology = [];

    for (var i = 0; i < table.length; i++) {
        if (table[i].genre === "hebrew") hebrew.push(table[i]);
        else if (table[i].genre === "greek") greek.push(table[i]);
        else if (table[i].genre === "latin") latin.push(table[i]);
        else if (table[i].genre === "trans") translations.push(table[i]);
        else if (table[i].genre === "theology") generalTheology.push(table[i]);
    }

    sacredLanguages.hebrew = hebrew;
    sacredLanguages.greek = greek;
    sacredLanguages.latin = latin;
    sacredLanguages.translations = translations;
    result.sacredLanguages = sacredLanguages;
    result.generalTheology = generalTheology;

    return result;
}

// A helper function. This constructs an object for the library of the
// Department of Philosophy.
function getPhilosophyLibrary(table) {
    var result = [];

    for (var i = 0; i < table.length; i++) {
        if (table[i].genre === "philosophy") result.push(table[i]);
    }

    return result;
}

// Exports.
module.exports = FacultyDepartmentMaker;
