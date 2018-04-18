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
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    tutorRoutes = require("./routes/tutors"),
    indexRoutes      = require("./routes/index"),
    searchRoutes = require("./routes/search");

    
// mongoose.connect("mongodb://localhost/bututor_v1");
var url = process.env.DATABASEURL || "mongodb://localhost/bututor_v1";
mongoose.connect(url);


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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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