var express = require("express");
    //var Survey = require("survey-jquery");
    var db = require("../models");
    var router = express.Router();

    router.get("/", function (req, res) {
        console.log("Activated");
        res.render("homePage");
    });

    router.get("/survey", function (req, res) {
        res.render("survey");
        console.log("Survey Activated");
    });

    router.post("/survey", function (req, res) {
        
    });

module.exports = router;
