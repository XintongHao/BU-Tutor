var express = require("express");
var router  = express.Router();
var Tutor = require("../models/tutor");
var middleware = require("../middleware");
var request = require("request");

//INDEX - show all tutors
router.get("/", function(req, res){
    // Get all tutors from DB
    Tutor.find({}, function(err, allTutors){
       if(err){
           console.log(err);
       } else {
           request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Modulus homepage.
                res.render("tutors/index",{tutors:allTutors});

            }
});
       }
    });
});

//CREATE - add new tutor to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data fro form and add to tutors array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newTutor = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Tutor.create(newTutor, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to tutors page
            console.log(newlyCreated);
            res.redirect("/tutors");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("tutors/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the tutor with provided ID
    Tutor.findById(req.params.id).populate("comments").exec(function(err, foundTutor){
        if(err){
            console.log(err);
        } else {
            console.log(foundTutor)
            //render show template with that campground
            res.render("tutors/show", {tutor: foundTutor});
        }
    });
});

router.get("/:id/edit", middleware.checkUserCampground, function(req, res){
    console.log("IN EDIT!");
    //find the tutor with provided ID
    Tutor.findById(req.params.id, function(err, foundTutor){
        if(err){
            console.log(err);
        } else {
            //render show template with that tutor
            res.render("tutors/edit", {tutor: foundTutor});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.desc};
    Tutor.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, tutor){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/tutors/" + tutor._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;

