var mongoose = require("mongoose");

var tutorSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   description1: String,
   schedule: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Tutor", tutorSchema);