var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Tutor = require("../models/tutor");


//root route
router.get("/", function(req, res){
    res.render("landing");
});

// // show register form
// router.get("/register", function(req, res){
//   res.render("register"); 
// });

// //handle sign up logic
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
//           res.redirect("/tutors"); 
//         });
//     });
// });

// //show login form
// router.get("/login", function(req, res){
//   res.render("login"); 
// });

// // //handling login logic
// router.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/tutors",
//         failureRedirect: "/login"
//     }), function(req, res){
// });

// google ---------------------------------

// send to google to do the authentication
router.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email'] 
}));

// the callback after google has authenticated the user
router.get('/auth/google/callback',passport.authenticate('google', {
        // CHANGE!!!!!!!!!!!!
        // successRedirect : '/tutors',
        successRedirect : '/profile',
        failureRedirect : '/'
    }));


// // PROFILE SECTION =========================
// router.get('/profile', middleware.isLoggedIn, function(req, res) {
//     res.render('profile.ejs', {
//         user : req.user
//     });
// });

// PROFILE SECTION =========================
router.get('/profile', middleware.isLoggedIn, function(req, res) {
    
    Tutor.find({}, function(err, allTutor){
        if(err){
            console.log(err);
        } 
        if(!allTutor){
            console.log("There is NO Tutor");
            var user = { userInfo: req.user};
            res.render('profile.ejs',{user: user});
        }
        
        else{
            allTutor.forEach(function(tutor){
                var tutorAuthorId = JSON.stringify(tutor.author.id);
                var reqUser_id = JSON.stringify(req.user._id);
                console.log(tutorAuthorId==reqUser_id);

                if (tutorAuthorId==reqUser_id){
                    console.log("User has tutor profile ");
                    console.log(tutor);
                    var user = { userInfo: req.user, userTutor: tutor};
                    res.render('profile.ejs' , {user: user});
                } else{
                    console.log("User doesn't have tutor profile");
                    user = { userInfo: req.user, userTutor: null};
                    res.render('profile.ejs', {user : user});
                }
            });
            
        }
    });
});


// logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "LOGGED YOU OUT!");
  res.redirect("/tutors");
});

module.exports = router;