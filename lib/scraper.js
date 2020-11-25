/*
This code holds a class which scrapes the required data from a database.
*/

// Imports.
const sqlite3 = require("sqlite3");

// Local imports.
const Finaliser = require("./finaliser.js");
const PersonMaker = require("./personmaker.js");
const KingdomMaker = require("./kingdommaker.js");
const DuchyMaker = require("./duchymaker.js");
const CountyMaker = require("./countymaker.js");
const BaronyMaker = require("./baronymaker.js");
const ManorMaker = require("./manormaker.js");
const ChivalricMaker = require("./chivalricmaker.js");
const GovMaker = require("./govmaker.js");
const PatentMaker = require("./patentmaker.js");
const AcademyMaker = require("./academymaker.js");
const FacultyMaker = require("./facultymaker.js");
const FacultyDepartmentMaker = require("./facultydepartmentmaker.js");
const HLibraryMaker = require("./hlibrarymaker.js");
const HCatalogueMaker = require("./hcataloguemaker.js");
const HCinemaMaker = require("./hcinemamaker.js");
const HTelevisionMaker = require("./htelevisionmaker.js");
const HAlbumsMaker = require("./halbumsmaker.js");
const HAnthemsMaker = require("./hanthemsmaker.js");

// Constants.
const pathToDB = "cyprus.db";
const pathToCanons = "canons.db";
const finaliser = new Finaliser();
const goldenAgeDOBCutoffL = 1485;
const goldenAgeDOBCutoffU = 1900;
const hCinemaBookILength = 40;
const hCinemaBookIILength = 20;
const hCinemaBookIIILength = 20;
const hCinemaBookIVLength = 20;
const hCinemaBookVPartLength = 10;
const hTelevisionLength = 15;
const hAlbumsLength = 150;
const hAnthemsLength = 150;

// The class in question.
class Scraper
{
    constructor()
    {

    }

    scrapeAsIs(req, res)
    {
        var tableName = req.params.id;
        var subScraper = new AsIsScraper();

        subScraper.checkTableName(req, res, tableName);
    }

    scrapePerson(req, res)
    {
        var code = req.params.id;
        var subScraper = new PersonScraper();

        subScraper.fetchPerson(req, res, code);
    }

    scrapeKingdom(req, res)
    {
        var subScraper = new KingdomScraper();

        subScraper.fetchDuchies(req, res);
    }

    scrapeDuchy(req, res)
    {
        var code = req.params.id;
        var subScraper = new DuchyScraper();

        subScraper.fetchDuchy(req, res, code);
    }

    scrapeCounty(req, res)
    {
        var code = req.params.id;
        var subScraper = new CountyScraper();

        subScraper.fetchCounty(req, res, code);
    }

    scrapeBarony(req, res)
    {
        var code = req.params.id;
        var subScraper = new BaronyScraper();

        subScraper.fetchBarony(req, res, code);
    }

    scrapeManor(req, res)
    {
        var code = req.params.id;
        var subScraper = new ManorScraper();

        subScraper.fetchManor(req, res, code);
    }

    scrapeChivalric(req, res)
    {
        var code = req.params.id;
        var subScraper = new ChivalricScraper();

        subScraper.fetchChivalric(req, res, code);
    }

    scrapeGov(req, res)
    {
        var subScraper = new GovScraper();

        subScraper.fetchGovernment(req, res);
    }

    scrapePatent(req, res)
    {
        var subScraper = new PatentScraper();

        subScraper.fetchPatent(req, res);
    }

    scrapeAcademy(req, res)
    {
        var subScraper = new AcademyScraper();

        subScraper.fetchAcademy(req, res);
    }

    scrapeFaculty(req, res)
    {
        var subScraper = new FacultyScraper();

        subScraper.fetchFaculty(req, res);
    }

    scrapeFacultyDepartment(req, res)
    {
        var subScraper = new FacultyDepartmentScraper();

        subScraper.fetchDepartment(req, res);
    }

    scrapeHLibrary(req, res)
    {
        var subScraper = new HLibraryScraper();

        subScraper.fetchGoldenPoets(req, res);
    }

    scrapeHCatalogue(req, res)
    {
        var subScraper = new HCatalogueScraper();

        subScraper.fetchHebrew(req, res);
    }

    scrapeHCinema(req, res)
    {
        var subScraper = new HCinemaScraper();

        subScraper.fetchBookI(req, res);
    }

    scrapeHTelevision(req, res)
    {
        var subScraper = new HTelevisionScraper();

        subScraper.fetchTVSeries(req, res);
    }

    scrapeHAlbums(req, res)
    {
        var subScraper = new HAlbumsScraper();

        subScraper.fetchAlbums(req, res);
    }

    scrapeHAnthems(req, res)
    {
        var subScraper = new HAnthemsScraper();

        subScraper.fetchSongs(req, res);
    }

    scrapeAllPerson(req, res)
    {
        var subScraper = new AllScraper();

        subScraper.doAllPerson(req, res);
    }

    scrapeAllDuchy(req, res)
    {
        var subScraper = new AllScraper();

        subScraper.doAllDuchy(req, res);
    }

    scrapeAllCounty(req, res)
    {
        var subScraper = new AllScraper();

        subScraper.doAllCounty(req, res);
    }

    scrapeAllBarony(req, res)
    {
        var subScraper = new AllScraper();

        subScraper.doAllBarony(req, res);
    }

    scrapeAllManor(req, res)
    {
        var subScraper = new AllScraper();

        subScraper.doAllManor(req, res);
    }

    scrapeAllChivalric(req, res)
    {
        var subScraper = new AllScraper();

        subScraper.doAllChivalric(req, res);
    }
}

// Handles tables retrieved from the database "as is".
class AsIsScraper
{
    constructor()
    {

    }

    checkTableName(req, res, tableName)
    {
        var query = "SELECT name FROM sqlite_master "+
                    "WHERE type = \"table\";";
        var db = new sqlite3.Database(pathToDB);
        var that = this;
        var tables, table;

        db.all(query, function(err, extract){
            db.close();

            tables = [];
            for(var i = 0; i < extract.length; i++)
            {
                table = extract[i].name;
                tables.push(table);
            }

            if(tables.includes(tableName)) that.fetch(req, res, tableName);
            else res.send("No table with name: "+tableName);
        });
    }

    fetch(req, res, tableName)
    {
        var query = "SELECT * FROM "+tableName+";";
        var db = new sqlite3.Database(pathToDB);
        var properties = { title: "table:"+tableName };
        var headings, rows;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            headings = Object.keys(extract[0]);
            rows = dictToRows(extract);
            properties.headings = headings;
            properties.rows = rows;
            finaliser.protoRender(req, res, "asis", properties);
        });
    }
}

// Scrapes lists of all records in a given table.
class AllScraper
{
    constructor()
    {

    }

    doAllPerson(req, res)
    {
        var key = "code", descriptor = "shortishTitle",
            tableName = "Person";
        var preKey = "/people/";
        var title = "List of People";
        var orderBy = "ORDER BY rankTier DESC, code";

        this.fetch(req, res, key, descriptor, tableName, orderBy,
                   preKey, title);
    }

    doAllDuchy(req, res)
    {
        var key = "code", descriptor = "name", tableName = "Duchy";
        var preKey = "/territories/duchies/";
        var title = "List of Duchies";
        var orderBy = "ORDER BY seniority, code";

        this.fetch(req, res, key, descriptor, tableName, orderBy,
                   preKey, title);
    }

    doAllCounty(req, res)
    {
        var key = "code", descriptor = "name", tableName = "County";
        var preKey = "/territories/counties/";
        var title = "List of Counties";
        var orderBy = "ORDER BY seniority, code";

        this.fetch(req, res, key, descriptor, tableName, orderBy,
                   preKey, title);
    }

    doAllBarony(req, res)
    {
        var key = "code", descriptor = "name", tableName = "Barony";
        var preKey = "/territories/baronies/";
        var title = "List of Baronies";
        var orderBy = "ORDER BY seniority, code";

        this.fetch(req, res, key, descriptor, tableName, orderBy,
                   preKey, title);
    }

    doAllManor(req, res)
    {
        var key = "code", descriptor = "name", tableName = "Manor";
        var preKey = "/territories/manors/";
        var title = "List of Manors";
        var orderBy = "ORDER BY seniority, code";

        this.fetch(req, res, key, descriptor, tableName, orderBy,
                   preKey, title);
    }

    doAllChivalric(req, res)
    {
        var key = "code", descriptor = "name", tableName = "Chivalric";
        var preKey = "/chivalric/";
        var title = "List of Chivalric Orders";
        var orderBy = "ORDER BY seniority, code";

        this.fetch(req, res, key, descriptor, tableName, orderBy,
                   preKey, title);
    }

    fetch(req, res, key, descriptor, tableName, orderBy, preKey, title)
    {
        var query = "SELECT "+key+" AS key, "+descriptor+" AS descriptor "+
                    "FROM "+tableName;
        var db = new sqlite3.Database(pathToDB);
        var headings, properties;

        if(orderBy === null) query = query+";";
        else query = query+" "+orderBy+";";

        headings = [key, descriptor];

        properties = {};
        properties.preKey = preKey;
        properties.title = title;
        properties.headings = headings;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            properties.data = extract;
            finaliser.protoRender(req, res, "listof", properties);
        });
    }
}

// Ronseal.
class PersonScraper
{
    constructor()
    {

    }

    fetchPerson(req, res, code)
    {
        var query = "SELECT * FROM Person WHERE code = ?;";
        var data = {};
        var db = new sqlite3.Database(pathToDB);
        var that = this;

        db.each(query, [code], function(err, extract){
            if(err) throw err;
            else if(data.length === 0)
            {
                db.close();
                res.send("No entry with key = "+code);
            }
            else
            {
                data.Person = extract;
                db.close();
                that.fetchPersonRanks(req, res, code, data);
            }
        });
    }

    fetchPersonRanks(req, res, code, data)
    {
        var query = "SELECT maleName, femaleName FROM Rank WHERE tier = ?;";
        var rankTier = data.Person.rankTier;
        var db = new sqlite3.Database(pathToDB);
        var that = this;

        db.each(query, [rankTier], function(err, extract){
            if(err) throw err;
            else if(data.length === 0)
            {
                res.send("Bad rank tier: "+rankTier);
                db.close();
            }
            else
            {
                data.Rank = extract;
                db.close();
                that.fetchPersonAccolades(req, res, code, data);
            }
        });
    }

    fetchPersonAccolades(req, res, code, data)
    {
        var query = "SELECT Accolade.name AS name, "+
                        "Accolade.chivalric AS chivalric "+
                    "FROM Holds "+
                    "JOIN Accolade ON Accolade.code = Holds.accolade "+
                    "JOIN Chivalric ON Chivalric.code = "+
                        "Accolade.chivalric "+
                    "WHERE person = ? "+
                    "ORDER BY Accolade.tier, Chivalric.seniority;";
        var db = new sqlite3.Database(pathToDB);
        var personMaker;

        db.all(query, [code], function(err, extract){
            if(err) throw err;
            else if(data.length === 0) data.Holds = null;
            else data.Holds = extract;

            db.close();
            personMaker = new PersonMaker(data);
            personMaker.finalise(req, res);
        });
    }
}

// Ronseal.
class KingdomScraper
{
    constructor()
    {

    }

    fetchDuchies(req, res)
    {
        var query = "SELECT Duchy.code AS code, Duchy.name AS name, "+
                        "Duchy.duke AS duke, "+
                        "Person.shortTitle AS dukeShortTitle, "+
                        "Person.style AS dukeStyle, "+
                        "Person.rankTier AS dukeRankTier "+
                    "FROM Duchy "+
                    "JOIN Person ON Person.code = Duchy.duke "+
                    "ORDER BY seniority;";
        var data = {};
        var db = new sqlite3.Database(pathToDB);
        var maker;

        db.all(query, function(err, extract){
            if(err || extract.length === 0) throw err;
            db.close();
            data.Duchies = extract;
            maker = new KingdomMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class DuchyScraper
{
    constructor()
    {

    }

    fetchDuchy(req, res, code)
    {
        var query = "SELECT Duchy.*, "+
                        "Duke.shortTitle AS dukeShortTitle, "+
                        "Duke.style AS dukeStyle, "+
                        "Duke.rankTier AS dukeRankTier, "+
                        "LordWarden.shortTitle AS lordWardenShortTitle, "+
                        "LordWarden.style AS lordWardenStyle, "+
                        "LordWarden.rankTier AS lordWardenRankTier "+
                    "FROM Duchy "+
                    "JOIN Person Duke on Duke.code = Duchy.duke "+
                    "JOIN Person LordWarden ON "+
                        "LordWarden.code = Duchy.lordWarden "+
                    "WHERE Duchy.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var that = this;

        db.each(query, [code], function(err, extract){
            if(err) throw err;
            else if(extract.length === 0)
            {
                db.close();
                res.send("No duchy with code = "+code);
            }
            else
            {
                db.close();
                data.Duchy = extract;
                that.fetchCounties(req, res, code, data);
            }
        });
    }

    fetchCounties(req, res, code, data)
    {
        var query = "SELECT County.*, "+
                        "Person.shortTitle AS earlShortTitle, "+
                        "Person.style AS earlStyle, "+
                        "Person.rankTier AS earlRankTier "+
                    "FROM County "+
                    "JOIN Person on Person.code = County.earl "+
                    "WHERE County.duchy = ? "+
                    "ORDER BY seniority;";
        var db = new sqlite3.Database(pathToDB);
        var that = this;
        var maker;

        db.all(query, [code], function(err, extract){
            if(err) throw err;
            db.close();
            data.Counties = extract;
            maker = new DuchyMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class CountyScraper
{
    constructor()
    {

    }

    fetchCounty(req, res, code)
    {
        var query = "SELECT County.*, "+
                        "Earl.shortTitle AS earlShortTitle, "+
                        "Earl.style AS earlStyle, "+
                        "Earl.rankTier AS earlRankTier, "+
                        "LordLieutenant.shortTitle AS "+
                            "lordLieutenantShortTitle, "+
                        "LordLieutenant.style AS lordLieutenantStyle, "+
                            "LordLieutenant.rankTier AS "+
                                "lordLieutenantRankTier "+
                        "FROM County "+
                        "JOIN Person Earl ON Earl.code = County.earl "+
                        "JOIN Person LordLieutenant ON "+
                            "LordLieutenant.code = County.lordLieutenant "+
                        "WHERE County.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var that = this;

        db.each(query, [code], function(err, extract){
            if(err || extract.length === 0) throw err;
            db.close();
            data.County = extract;
            that.fetchBaronies(req, res, code, data);
        });
    }

    fetchBaronies(req, res, code, data)
    {
        var query = "SELECT Barony.*, "+
                        "Person.shortTitle AS baronShortTitle, "+
                        "Person.style AS baronStyle, "+
                        "Person.rankTier AS baronRankTier "+
                    "FROM Barony "+
                    "JOIN Person on Person.code = Barony.baron "+
                    "WHERE Barony.county = ? "+
                    "ORDER BY seniority;";
        var db = new sqlite3.Database(pathToDB);
        var that = this;
        var maker;

        db.all(query, [code], function(err, extract){
            if(err || extract.length === 0) throw err;
            db.close();
            data.Baronies = extract;
            maker = new CountyMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class BaronyScraper
{
    constructor()
    {

    }

    fetchBarony(req, res, code)
    {
        var query = "SELECT Barony.*, "+
                        "Baron.shortTitle AS baronShortTitle, "+
                        "Baron.style AS baronStyle, "+
                        "Baron.rankTier AS baronRankTier, "+
                        "KnightLieutenant.shortTitle AS "+
                            "knightLieutenantShortTitle, "+
                        "KnightLieutenant.style AS knightLieutenantStyle, "+
                        "KnightLieutenant.rankTier AS "+
                            "knightLieutenantRankTier "+
                        "FROM Barony "+
                        "JOIN Person Baron ON Baron.code = Barony.baron "+
                        "JOIN Person KnightLieutenant ON "+
                            "KnightLieutenant.code = "+
                                "Barony.knightLieutenant "+
                        "WHERE Barony.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var that = this;

        db.each(query, [code], function(err, extract){
            if(err || extract.length === 0) throw err;
            data.Barony = extract;
            db.close();
            that.fetchManors(req, res, code, data);
        });
    }

    fetchManors(req, res, code, data)
    {
        var query = "SELECT Manor.*, "+
                        "Person.shortTitle AS masterShortTitle, "+
                        "Person.style AS masterStyle, "+
                        "Person.rankTier AS masterRankTier "+
                    "FROM Manor "+
                    "JOIN Person on Person.code = Manor.master "+
                    "WHERE Manor.barony = ? "+
                    "ORDER BY seniority;";
        var db = new sqlite3.Database(pathToDB);
        var that = this;
        var maker;

        db.all(query, [code], function(err, extract){
            if(err || extract.length === 0) throw err;
            db.close();
            data.Manors = extract;
            maker = new BaronyMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class ManorScraper
{
    constructor()
    {

    }

    fetchManor(req, res, code)
    {
        var query = "SELECT Manor.*, "+
                        "Master.shortTitle AS masterShortTitle, "+
                        "Master.style AS masterStyle, "+
                        "Master.rankTier AS masterRankTier "+
                    "FROM Manor "+
                    "JOIN Person Master on Master.code = Manor.master "+
                    "WHERE Manor.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var that = this;
        var maker;

        db.each(query, [code], function(err, extract){
            if(err || extract.length === 0) throw err;
            db.close();
            data.Manor = extract;
            maker = new ManorMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class ChivalricScraper
{
    constructor()
    {

    }

    fetchChivalric(req, res, code)
    {
        var query = "SELECT Chivalric.*, "+
                        "Master.shortTitle AS masterShortTitle, "+
                        "Master.style AS masterStyle, "+
                        "Master.rankTier AS masterRankTier "+
                    "FROM Chivalric "+
                    "LEFT JOIN Person Master "+
                        "ON Master.code = Chivalric.master "+
                    "WHERE Chivalric.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var that = this;

        db.each(query, [code], function(err, extract){
            if(err) throw err;
            else if(extract.length === 0)
            {
                db.close();
                res.send("No chivalric order with code = "+code);
            }
            else
            {
                db.close();
                data.Chivalric = extract;
                that.fetchAccolades(req, res, code, data);
            }
        });
    }

    fetchAccolades(req, res, code, data)
    {
        var query = "SELECT name FROM Accolade WHERE chivalric = ?;";
        var db = new sqlite3.Database(pathToDB);
        var that = this;

        db.all(query, [code], function(err, extract){
            if(err) throw err;
            db.close();
            data.Accolade = extract;
            that.fetchHolds(req, res, code, data);
        });
    }

    fetchHolds(req, res, code, data)
    {
        var query = "SELECT Holds.person, Holds.accolade, Person.code, "+
                        "Person.shortTitle, Person.style, "+
                        "Person.rankTier, Accolade.name "+
                    "FROM Holds "+
                    "JOIN Person ON Person.code = Holds.person "+
                    "JOIN Accolade ON Accolade.code = Holds.accolade "+
                    "WHERE Accolade.chivalric = ? "+
                    "ORDER BY Accolade.tier DESC, Person.rankTier DESC;";
        var db = new sqlite3.Database(pathToDB);
        var maker;

        db.all(query, [code], function(err, extract){
            if(err) throw err;
            db.close();
            data.Holds = extract;
            maker = new ChivalricMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class GovScraper
{
    constructor()
    {

    }

    fetchGovernment(req, res)
    {
        var query = "SELECT Government.*, "+
                        "Chancellor.shortTitle AS chancellorShortTitle, "+
                            "Chancellor.style AS chancellorStyle, "+
                            "Chancellor.rankTier AS chancellorRankTier, "+
                        "Marshal.shortTitle AS marshalShortTitle, "+
                            "Marshal.style AS marshalStyle, "+
                            "Marshal.rankTier AS marshalRankTier, "+
                        "Steward.shortTitle AS stewardShortTitle, "+
                            "Steward.style AS stewardStyle, "+
                            "Steward.rankTier AS stewardRankTier, "+
                        "Remembrancer.shortTitle AS "+
                                "remembrancerShortTitle, "+
                            "Remembrancer.style AS remembrancerStyle, "+
                            "Remembrancer.rankTier AS "+
                                "remembrancerRankTier, "+
                        "Ecclesiarch.shortTitle AS ecclesiarchShortTitle, "+
                            "Ecclesiarch.style AS ecclesiarchStyle, "+
                            "Ecclesiarch.rankTier AS ecclesiarchRankTier, "+
                        "MasterOfOffices.shortTitle AS "+
                                "masterOfOfficesShortTitle, "+
                            "MasterOfOffices.style AS "+
                                "masterOfOfficesStyle, "+
                            "MasterOfOffices.rankTier AS "+
                                "masterOfOfficesRankTier, "+
                        "MasterOfHorse.shortTitle AS "+
                                "masterOfHorseShortTitle, "+
                            "MasterOfHorse.style AS masterOfHorseStyle, "+
                            "MasterOfHorse.rankTier AS "+
                                "masterOfHorseRankTier, "+
                        "MasterOfTheRolls.shortTitle AS "+
                                "masterOfTheRollsShortTitle, "+
                            "MasterOfTheRolls.style AS "+
                                "masterOfTheRollsStyle, "+
                            "MasterOfTheRolls.rankTier AS "+
                                "masterOfTheRollsRankTier, "+
                        "MasterOfTheBedchamber.shortTitle AS "+
                                "masterOfTheBedchamberShortTitle, "+
                            "MasterOfTheBedchamber.style AS "+
                                "masterOfTheBedchamberStyle, "+
                            "MasterOfTheBedchamber.rankTier AS "+
                                "masterOfTheBedchamberRankTier, "+
                        "MasterOfAlms.shortTitle AS "+
                                "masterOfAlmsShortTitle, "+
                            "MasterOfAlms.style AS masterOfAlmsStyle, "+
                            "MasterOfAlms.rankTier AS "+
                                "masterOfAlmsRankTier, "+
                        "Regent.shortTitle AS regentShortTitle, "+
                            "Regent.style AS regentStyle, "+
                            "Regent.rankTier AS regentRankTier "+
                    "FROM Government "+
                    "LEFT JOIN Person Chancellor "+
                        "ON Chancellor.code = Government.chancellor "+
                    "LEFT JOIN Person Marshal "+
                        "ON Marshal.code = Government.marshal "+
                    "LEFT JOIN Person Steward "+
                        "ON Steward.code = Government.steward "+
                    "LEFT JOIN Person Remembrancer "+
                        "ON Remembrancer.code = Government.remembrancer "+
                    "LEFT JOIN Person Ecclesiarch "+
                        "ON Ecclesiarch.code = Government.ecclesiarch "+
                    "LEFT JOIN Person MasterOfOffices "+
                        "ON MasterOfOffices.code = "+
                            "Government.masterOfOffices "+
                    "LEFT JOIN Person MasterOfHorse "+
                        "ON MasterOfHorse.code = Government.masterOfHorse "+
                    "LEFT JOIN Person MasterOfTheRolls "+
                        "ON MasterOfTheRolls.code = "+
                            "Government.masterOfTheRolls "+
                    "LEFT JOIN Person MasterOfTheBedchamber "+
                        "ON MasterOfTheBedchamber.code = "+
                            "Government.masterOfTheBedchamber "+
                    "LEFT JOIN Person MasterOfAlms "+
                        "ON MasterOfAlms.code = Government.masterOfAlms "+
                    "LEFT JOIN Person Regent "+
                        "ON Regent.code = Government.regent "+
                    "WHERE id = 0;";
        var db = new sqlite3.Database(pathToDB);
        var maker;

        db.each(query, function(err, extract){
            if(err) throw err;
            db.close();
            maker = new GovMaker(extract);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class PatentScraper
{
    constructor()
    {

    }

    fetchPatent(req, res)
    {
        var query = "SELECT * FROM Patent;";
        var db = new sqlite3.Database(pathToDB);
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            maker = new PatentMaker(extract);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class AcademyScraper
{
    constructor()
    {

    }

    fetchAcademy(req, res)
    {
        var query = "SELECT * FROM AcademyProperty;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.academy = extract;
            that.fetchLeadership(req, res, data);
        });
    }

    fetchLeadership(req, res, data)
    {
        var query = "SELECT AcademyProperty.*, Person.code AS personCode, "+
                        "Person.style AS personStyle, "+
                        "Person.shortTitle AS "+
                            "personShortTitle, "+
                        "Person.rankTier AS personRankTier "+
                    "FROM AcademyProperty "+
                    "JOIN Person ON Person.code = AcademyProperty.value "+
                    "WHERE ((AcademyProperty.property = 'chancellor') OR "+
                        "(AcademyProperty.property = 'viceChancellor'));";
        var db = new sqlite3.Database(pathToDB);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.leadership = extract;
            that.fetchFaculties(req, res, data);
        });
    }

    fetchFaculties(req, res, data)
    {
        var query = "SELECT * FROM Faculty;";
        var db = new sqlite3.Database(pathToDB);
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.faculties = extract;
            maker = new AcademyMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class FacultyScraper
{
    constructor()
    {

    }

    fetchFaculty(req, res)
    {
        var query = "SELECT Faculty.*, Person.code AS personCode, "+
                        "Person.shortTitle AS personShortTitle, "+
                        "Person.style AS personStyle, "+
                        "Person.rankTier AS personRankTier "+
                    "FROM Faculty "+
                    "LEFT JOIN Person on Person.code = "+
                        "Faculty.proViceChancellor "+
                    "WHERE Faculty.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var data = {};
        var code = req.params.id;
        var that = this;

        db.all(query, [code], function(err, extract){
            if(err) throw err;
            db.close();
            data.faculty = extract;
            that.fetchDepartments(req, res, data, code);
        });
    }

    fetchDepartments(req, res, data, faculty)
    {
        var query = "SELECT * FROM FacultyDepartment WHERE faculty = ?;";
        var db = new sqlite3.Database(pathToDB);
        var maker;

        db.all(query, [faculty], function(err, extract){
            if(err) throw err;
            db.close();
            data.departments = extract;
            maker = new FacultyMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class FacultyDepartmentScraper
{
    constructor()
    {

    }

    fetchDepartment(req, res)
    {
        var query = "SELECT FacultyDepartment.*, "+
                        "Faculty.code AS facultyCode, "+
                        "Faculty.name AS facultyName, "+
                        "Person.shortTitle AS personShortTitle, "+
                        "Person.code AS personCode, "+
                        "Person.style AS personStyle, "+
                        "Person.rankTier AS personRankTier "+
                    "FROM FacultyDepartment "+
                    "LEFT JOIN Faculty ON Faculty.code = "+
                        "FacultyDepartment.faculty "+
                    "LEFT JOIN Person ON Person.code = "+
                        "FacultyDepartment.professor "+
                    "WHERE FacultyDepartment.code = ?;";
        var db = new sqlite3.Database(pathToDB);
        var code = req.params.id;
        var data = {};
        var that = this;

        db.all(query, [code], function(err, extract){
            if(err) throw err;
            db.close();
            data.department = extract;
            that.getBook(data, req, res);
        });
    }

    getBook(data, req, res)
    {
        var query = "SELECT Book.*, Author.shortTitle AS authorShortTitle "+
                    "FROM Book "+
                    "LEFT JOIN Author ON Author.code = Book.author "+
                    "ORDER BY IFNULL(Author.surname, 'zzz') ASC, "+
                        "IFNULL(Book.yearPublished, 9999) ASC;"
        var db = new sqlite3.Database(pathToCanons);
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close;
            data.Book = extract;
            maker = new FacultyDepartmentMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class HLibraryScraper
{
    constructor()
    {

    }

    fetchGoldenPoets(req, res)
    {
        var query = "SELECT Book.*, Author.fullTitle AS authorFullTitle "+
                    "FROM Book JOIN Author ON Author.code = Book.author "+
                    "WHERE (((Author.dob > "+goldenAgeDOBCutoffL+") AND "+
                            "(Author.dob < "+goldenAgeDOBCutoffU+")) AND "+
                            "(Book.genre = 'poetry')) "+
                    "ORDER BY Author.surname, Author.forenames, "+
                        "Book.yearPublished;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;
        var data = {};

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.goldenPoets = extract;
            that.fetchOtherPoets(req, res, data);
        });
    }

    fetchOtherPoets(req, res, data)
    {
        var query = "SELECT Book.*, Author.fullTitle AS authorFullTitle "+
                    "FROM Book JOIN Author ON Author.code = Book.author "+
                    "WHERE (((Author.dob <= "+goldenAgeDOBCutoffL+") OR "+
                            "(Author.dob >= "+goldenAgeDOBCutoffU+")) AND "+
                            "(Book.genre = 'poetry')) "+
                    "ORDER BY Author.surname, Author.forenames, "+
                        "Book.yearPublished;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.otherPoets = extract;
            that.fetchAnthologies(req, res, data);
        });
    }

    fetchAnthologies(req, res, data)
    {
        var query = "SELECT * "+
                    "FROM Book "+
                    "WHERE ((author IS NULL) AND (genre = 'poetry')) "+
                    "ORDER BY yearPublished, title;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.anthologies = extract;
            that.fetchPoetryRelated(req, res, data);
        });
    }

    fetchPoetryRelated(req, res, data)
    {
        var query = "SELECT Book.*, Author.fullTitle AS authorFullTitle "+
                    "FROM Book "+
                    "LEFT JOIN Author ON Author.code = Book.author "+
                    "WHERE Book.genre = 'poetry-related' "+
                    "ORDER BY Book.title;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.poetryRelated = extract;
            maker = new HLibraryMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class HCatalogueScraper
{
    construtor()
    {

    }

    fetchHebrew(req, res)
    {
        var query = "SELECT PaperBook.*, "+
                        "Author.fullTitle AS authorFullTitle "+
                    "FROM PaperBook "+
                    "LEFT JOIN Author ON Author.code = PaperBook.author "+
                    "WHERE PaperBook.genre = 'hebrew' "+
                    "ORDER BY Author.surname ASC, "+
                        "PaperBook.yearPublished ASC, PaperBook.title ASC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;
        var data = {};

        data.sacredLanguages = {};

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.sacredLanguages.hebrew = extract;
            that.fetchGreek(req, res, data);
        });
    }

    fetchGreek(req, res, data)
    {
        var query = "SELECT PaperBook.*, Author.fullTitle AS authorFullTitle "+
                                "FROM PaperBook "+
                                "LEFT JOIN Author ON Author.code = PaperBook.author "+
                                "WHERE PaperBook.genre = 'greek' "+
                                "ORDER BY Author.surname ASC, "+
                                    "PaperBook.yearPublished ASC, PaperBook.title ASC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.sacredLanguages.greek = extract;
            that.fetchLatin(req, res, data);
        });
    }

    fetchLatin(req, res, data)
    {
        var query = "SELECT PaperBook.*, Author.fullTitle AS authorFullTitle "+
                                "FROM PaperBook "+
                                "LEFT JOIN Author ON Author.code = PaperBook.author "+
                                "WHERE PaperBook.genre = 'latin' "+
                                "ORDER BY Author.surname ASC, "+
                                    "PaperBook.yearPublished ASC, PaperBook.title ASC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.sacredLanguages.latin = extract;
            that.fetchPoetry(req, res, data);
        });
    }

    fetchPoetry(req, res, data)
    {
        var query = "SELECT PaperBook.*, "+
                        "Author.fullTitle AS authorFullTitle "+
                    "FROM PaperBook "+
                    "LEFT JOIN Author ON Author.code = PaperBook.author "+
                    "WHERE PaperBook.genre = 'poetry' "+
                    "ORDER BY Author.surname ASC, "+
                        "PaperBook.yearPublished ASC, PaperBook.title ASC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.poetry = extract;
            that.fetchPoetryRelated(req, res, data);
        });
    }

    fetchPoetryRelated(req, res, data)
    {
        var query = "SELECT PaperBook.*, "+
                        "Author.fullTitle AS authorFullTitle "+
                    "FROM PaperBook "+
                    "LEFT JOIN Author ON Author.code = PaperBook.author "+
                    "WHERE PaperBook.genre = 'poetry-related' "+
                    "ORDER BY Author.surname ASC, "+
                        "PaperBook.yearPublished ASC, PaperBook.title ASC;";
        var db = new sqlite3.Database(pathToCanons);
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.poetryRelated = extract;
            maker = new HCatalogueMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class HCinemaScraper
{
    constructor()
    {

    }

    fetchBookI(req, res)
    {
        var maxRank = hCinemaBookILength+hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'comedy') AND "+
                        "(rank <= "+maxRank+") AND "+
                        "(rank > "+hCinemaBookVPartLength+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;
        var data = {};

        data.bookV = {};

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookI = extract;
            that.fetchBookII(req, res, data);
        });
    }

    fetchBookII(req, res, data)
    {
        var maxRank = hCinemaBookIILength+hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'tragedy') AND "+
                           "(rank <= "+maxRank+") AND "+
                           "(rank > "+hCinemaBookVPartLength+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookII = extract;
            that.fetchBookIII(req, res, data);
        });
    }

    fetchBookIII(req, res, data)
    {
        var maxRank = hCinemaBookIIILength+hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'satire') AND "+
                           "(rank <= "+maxRank+") AND "+
                           "(rank > "+hCinemaBookVPartLength+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookIII = extract;
            that.fetchBookIV(req, res, data);
        });
    }

    fetchBookIV(req, res, data)
    {
        var maxRank = hCinemaBookIVLength+hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'other') AND "+
                           "(rank <= "+maxRank+") AND "+
                           "(rank > "+hCinemaBookVPartLength+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookIV = extract;
            that.fetchBookVPart1(req, res, data);
        });
    }

    fetchBookVPart1(req, res, data)
    {
        var maxRank = hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'comedy') AND (rank <= "+maxRank+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookV.part1 = extract;
            that.fetchBookVPart2(req, res, data);
        });
    }

    fetchBookVPart2(req, res, data)
    {
        var maxRank = hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'tragedy') AND "+
                           "(rank <= "+maxRank+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookV.part2 = extract;
            that.fetchBookVPart3(req, res, data);
        });
    }

    fetchBookVPart3(req, res, data)
    {
        var maxRank = hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'satire') AND "+
                           "(rank <= "+maxRank+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookV.part3 = extract;
            that.fetchBookVPart4(req, res, data);
        });
    }

    fetchBookVPart4(req, res, data)
    {
        var maxRank = hCinemaBookVPartLength;
        var query = "SELECT * FROM Film "+
                    "WHERE ((genre = 'other') AND (rank <= "+maxRank+")) "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookV.part4 = extract;
            that.fetchBookVPart5(req, res, data);
        });
    }

    fetchBookVPart5(req, res, data)
    {
        var query = "SELECT * FROM Film "+
                    "WHERE topTen <= "+hCinemaBookVPartLength+" "+
                    "ORDER BY topTen DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.bookV.part5 = extract;
            that.fetchDeuterocanon(req, res, data);
        });
    }

    fetchDeuterocanon(req, res, data)
    {
        var query = "SELECT * FROM Film "+
                    "WHERE (rank IS NULL) AND (topTen IS NULL) "+
                        "AND (genre != 'adaptation') "+
                    "ORDER BY title;";
        var db = new sqlite3.Database(pathToCanons);
        var that = this;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data.deuterocanon = extract;
            that.fetchAdaptations(req, res, data);
        });
    }

    fetchAdaptations(req, res, data)
    {
        var query = "SELECT Film.title, Film.year, Film.notes, "+
                        "Film.internalLink, Film.externalLink, "+
                        "Book.title AS adaptedFrom, "+
                        "Author.fullTitle AS author "+
                    "FROM Film "+
                    "LEFT JOIN Book ON Book.id = Film.adaptedFrom "+
                    "LEFT JOIN Author ON Author.code = Book.author "+
                    "WHERE Film.genre = 'adaptation' "+
                    "ORDER BY Author.surname, Book.title;";
        var db = new sqlite3.Database(pathToCanons);
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            console.log(extract);
            data.adaptations = extract;
            maker = new HCinemaMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class HTelevisionScraper
{
    constructor()
    {

    }

    fetchTVSeries(req, res)
    {
        var query = "SELECT * FROM TVSeries "+
                    "WHERE rank <= "+hTelevisionLength+" "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var data;
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data = extract;
            maker = new HTelevisionMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class HAlbumsScraper
{
    constructor()
    {

    }

    fetchAlbums(req, res)
    {
        var query = "SELECT * FROM Album "+
                    "WHERE rank <= "+hAlbumsLength+" "+
                    "ORDER BY rank DESC;";
        var db = new sqlite3.Database(pathToCanons);
        var data;
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data = extract;
            maker = new HAlbumsMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Ronseal.
class HAnthemsScraper
{
    constructor()
    {

    }

    fetchSongs(req, res)
    {
        var query = "SELECT * FROM Song "+
                    "WHERE rank <= "+hAnthemsLength+" "+
                    "ORDER BY rank DESC, title;";
        var db = new sqlite3.Database(pathToCanons);
        var data;
        var maker;

        db.all(query, function(err, extract){
            if(err) throw err;
            db.close();
            data = extract;
            maker = new HAnthemsMaker(data);
            maker.finalise(req, res);
        });
    }
}

// Extract the rows from a list of dictionaries.
function dictToRows(list)
{
    var result = [];
    var row = [];

    for(var i = 0; i < list.length; i++)
    {
        row = Object.values(list[i]);
        result.push(row);
    }

    return result;
}

// Exports.
module.exports = Scraper;
