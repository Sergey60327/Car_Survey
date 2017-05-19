<<<<<<< HEAD
    var express = require("express");
    //var Survey = require("survey-jquery");
    var db = require("../models");
    var router = express.Router();
=======
var express = require("express");
var passport = require("passport");
var db = require("../models");
var router = express.Router();
>>>>>>> bb5692fb39c5a62908447bb136351c473a468dfb

    router.get("/", function (req, res) {
        console.log("Activated");
        res.render("homePage");
    });

    router.get("/survey", function (req, res) {
        res.render("survey");
        console.log("Survey Activated");
    });

    router.post("/survey", function (req, res) {
        var randomNumber = Math.floor((Math.random() * 8) + 1);
        res.send(randomNumber.toString());
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render("login", { message: req.flash('loginMessage') });
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/carsList', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: "wrong email or password"
    }),
    function (req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });
   

     //=====================================
     //SIGNUP ==============================
     //=====================================
     //show the signup form
    router.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: "Bad email" // allow flash messages
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

module.exports = router;
