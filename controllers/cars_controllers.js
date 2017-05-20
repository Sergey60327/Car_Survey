var express = require("express");
var passport = require("passport");
var db = require("../models");
var router = express.Router();

router.get("/", function (req, res) {
    console.log("Activated");
    res.render("homePage");
});

router.get("/survey", function (req, res) {
    console.log("Survey Activated");
    res.render("survey");
});

router.post("/survey", function (req, res) {
    var randomNumber = Math.floor((Math.random() * 8) + 1);
    res.send(randomNumber.toString());
});

//route to get specific userData
router.get("/cardatabyuser/:user", function (req, res) {
    db.Car.find({
        where: {
            username: req.params.user
        }
    }).done(function (response) {
        console.log("finding one car");
        res.json(response);
    });
});

//route to get all Car Data
router.get("/carslist", function (req, res) {
    db.Car.findAll().then(function (response) {
        var data = {
            carsList: response,
        }
        res.render("carsList", data);
    }); 
});

//route to get just one car data
router.get("/cardatabyid/:carid", function (req, res) {
    console.log("________");
    console.log(req.params.carid);
    db.Car.find({
        where: {
            id: req.params.carid
        }
    }).done(function (response) {
        res.json(response);
    });
});

router.post("/carslist", function (req, res) {
    console.log(req.body);
    console.log(req.body.carInfo);
    console.log(req.body.carInfo.color);
    db.Car.create({
        make: req.body.carInfo.make,
        model: req.body.carInfo.model,
        year: req.body.carInfo.year,
        color: req.body.carInfo.color,
        price: req.body.carInfo.price,
        photo: req.body.carInfo.photoURL,
        username: req.body.username
    }).done(function (response) {
        console.log("Car Inserted");
        res.send("/carslist");
    });
});

//route to retrieve database info for client side
router.get("/carsdb", function (req, res) {
    db.Car.findAll().then(function (response) {
        var data = {
            carsList: response
        }
        res.json(data);
    });
});

//route to update cars to null after swap
router.put("/updatecarstoswapped", function (req, res) {
    console.log(req.body);
    db.Car.update({
        swapStatus: 2,
        swapped: true
    }, {
        where: {
            username: [req.body.currentUser, req.body.userSwap]
        }
    }).done(function (response) {
        console.log("Car Updated to Final Swap Status");
        res.send("/carslist");
    });
});
//Route to reset cars back to normal upon no of the requestee
router.put("/updatecarstonotswapped", function (req, res) {
    db.Car.update({
        swapStatus: 0,
        swappedOrPendingSwap: false,
        initiatedSwap: null,
        swapCarID: null,
        userSwap: null
    }, {
        where: {
            username: req.body.currentUser
        }
    }).done(function (response) {
        //requestee update
        db.Car.update({
            swapStatus: 0,
            swappedOrPendingSwap: false,
            initiatedSwap: null,
            swapCarID: null,
            userSwap: null
        }, {
            where: {
                username: req.body.userSwap
            }
        }).done(function (response) {
            //requestee update
            console.log("Cars Updated");
            res.send("/carslist");
        });
    });
});

//route to update swapStats for both users involved
router.put("/updateSwapStatus/:currentuser", function (req, res) {
    var currentUser = req.params.currentuser;
    var userForSwap = req.body.userSwap;
    var vehicleSwapId = req.body.vehicleSwapId;
    var currentCarId = req.body.currentCarId;
    console.log(currentUser + "-" + userForSwap);
    //requestor update
    db.Car.update({
        swapStatus: 1,
        swappedOrPendingSwap: true,
        initiatedSwap: true,
        swapCarID: vehicleSwapId,
        userSwap: userForSwap
    }, {
        where: {
            username: currentUser
        }
    }).done(function (response) {
        //requestee update
        db.Car.update({
            swapStatus: 1,
            swappedOrPendingSwap: true,
            initiatedSwap: false,
            swapCarID: currentCarId,
            userSwap: currentUser
        }, {
            where: {
                username: userForSwap
            }
        }).done(function (response) {
            //requestee update
            console.log("Cars Updated");
            res.send("/carslist");
        });
        console.log("Cars Updated");
    });
});

//route to delete existing car so only one car per user at time of completition of survey
router.delete("/deletecar/:user", function (req, res) {
    console.log("delete");
    db.Car.destroy({
        where: {
            username: req.params.user,
            //Added in AND critera so it only deletes the existing car that has already been swapped
            $and: {
                swapStatus: 2
            }
        }
    }).done(function () {
        console.log("car deleted");
    });
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
    successRedirect: '/carslist', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
}));
   
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
}));


//Code for V2 logout. Not being used currently
// =====================================
// LOGOUT ==============================
// =====================================
//router.get('/logout', function (req, res) {
//    req.logout();
//    res.redirect('/');
//});

//// route middleware to make sure
//function isLoggedIn(req, res, next) {

//    // if user is authenticated in the session, carry on
//    if (req.isAuthenticated())
//    return next();
//    // if they aren't redirect them to the home page
//    res.redirect('/');
//}

module.exports = router;
