var express = require('express');
var router  = express.Router();
var app = express();
var middleware = require("../middleware");
var request = require("request");
var mongoose = require("mongoose");
var Tutor = require("../models/tutor.js");
app.set('view engine', 'ejs');

router.get("/", function(req, res){
    res.render("search/search.ejs");
});

// ,{ $or:[ {description: query}, {description1: query1}]}

router.get("/results", function(req, res){
    var query = req.query.search;
    var query1 = req.query.search1;
    Tutor.find( { $or:[ {description: query}, {description1: query1}]}, function(err, allTutors){
        if(err){
            console.log(err);
        } else {
            res.render("search/results.ejs", {tutors: allTutors}); 
        }
    }).sort( {name: 1} );
});

Tutor.find({description: "Python"}, (function (err,tutors){
        if(err) {
            console.log(err);
        } else{
            console.log("query:");
            tutors.forEach(function(tutor){
                console.log(tutor.name);
            });
        }
})
);


        
module.exports = router;
