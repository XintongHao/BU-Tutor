var express = require("express");
var router  = express.Router({mergeParams: true});
var Tutor = require("../models/tutor");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find tutor by id
    // console.log(req.params.id);
    Tutor.findById(req.params.id, function(err, tutor){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {tutor: tutor});
        }
    });
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup tutor using ID
   Tutor.findById(req.params.id, function(err, tutor){
       if(err){
           console.log(err);
           res.redirect("/tutors");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
        
               var dt = new Date();  
            // Display the month, day, and year. getMonth() returns a 0-based number.  
               var month = dt.getMonth()+1;  
               var day = dt.getDate();  
               var year = dt.getFullYear();  
               comment.time = month + "/" + day + "/" + year;
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               
            //   console.log("This is req.body.comment!!!!");
            //   console.log(req.body.comment);
            //   console.log("This is req.body.comment.text!!!!");
            //   console.log(req.body.comment.text);
            //   console.log("This comment!!!!!");
            //   console.log(comment);
            //   console.log("This tuotr!!!!!");
            //   console.log(tutor);

               
               //save comment
            //   comment.save(function(err,comment){
            //       if (err) { console.log(err);}
                   
            //       tutor.comments.push(comment);
            //       tutor.save(function(err, tutor){
            //           if (err) { console.log(err);}
            //           console.log("This is comment in the tutor.save!!!!");
            //           console.log(comment);
            //           });
            //       });
              comment.save();
              tutor.comments.push(comment);
              tutor.save();
            //   console.log("This is tutor.comments!!!!!");
            //   console.log(tutor.comments);
            //   console.log("This tuotr again!!!!!!save or not????");
            //   console.log(tutor);
            //   console.log("This is comment!!!!!!!!");
            //   console.log(comment);
            
               req.flash('success', 'Created a comment!');
               res.redirect('/tutors/' + tutor._id);
           }
        });
       }
   });
});

router.get("/:commentId/edit", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {tutor_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/tutors/" + req.params.id);
       }
   }); 
});

router.delete("/:commentId",middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/tutors/" + req.params.id);
        }
    })
});

module.exports = router;