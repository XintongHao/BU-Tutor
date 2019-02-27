// var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

// var UserSchema = new mongoose.Schema({
//     username: String,
//     password: String
// });

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", UserSchema);


var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email   : String,
    googleId: String
});

module.exports = mongoose.model('user', userSchema);



// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// // define the schema for our user model
// var userSchema = mongoose.Schema({

//     local            : {
//         username     : String,
//         password     : String
//     },
  
//     google           : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     }

// });

// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// create the model for users and expose it to our app
// module.exports = mongoose.model('User', userSchema);
