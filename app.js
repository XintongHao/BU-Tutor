var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    // cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    Tutor  = require("./models/tutor"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    session = require("express-session"),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override");
    // GoogleStrategy = require('passport-google-oauth2').Strategy;
    
    
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    tutorRoutes = require("./routes/tutors"),
    indexRoutes      = require("./routes/index"),
    searchRoutes = require("./routes/search");

// mongoose.connect('mongodb://localhost/google_passport');

// mongoose.connect("mongodb://localhost/bututor_v1");
// var url = process.env.DATABASEURL || "mongodb://localhost/bututor_v1";

mongoose.connect("mongodb://123:123@ds251799.mlab.com:51799/test_hao");

// require('./config/passport')(passport); // pass passport for configuration



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
// app.use(cookieParser('secret'));


// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
// load up the user model
// load the auth variables
var configAuth = require('./config/auth'); // use this one for testing

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, 
    function(req, token, refreshToken, profile, done){
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({'googleId' : profile.id }, function(err, user){
                    if (err)
                        return done(err);
                    if (user){
                        console.log('User has already sign in: ', user);
                        return done(null, user);
                    } else{
                        new User({
                            googleId: profile.id,
                            username: profile.displayName,
                            email: (profile.emails[0].value || '').toLowerCase()// pull the first email
                        }).save().then((newUser) => {
                            console.log('Create a new User: ', newUser);
                            return done(null, newUser);
                        });
                    }
                });
            }
        });
    })
);







app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});



app.use("/", indexRoutes);
app.use("/tutors", tutorRoutes);
app.use("/tutors/:id/comments", commentRoutes);
app.use("/search",searchRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The BU Tutor Server Has Started!");
});