// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Set Up Method Override
app.use(methodOverride("_method"));

//Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
var router = require("./controllers/cars_controllers.js");
app.use('/', router);

//Database Sync
var db = require("./models");
db.sequelize.sync({ force: true }).then(function () {
    // Starts the server to begin listening
    // =============================================================
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
