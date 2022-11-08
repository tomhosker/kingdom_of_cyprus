/*
This code handles the site's home page.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");

// Constant objects.
const finaliser = new Finaliser();
const router = express.Router();

// Return the home page.
router.get("/", function (req, res, next) {
    finaliser.protoRender(req, res, "index", { title: "Welcome" });
});

// Exports.
module.exports = router;
