// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'googleAuth' : {
        'clientID'         : 'your_google_clientID',
        'clientSecret'     : 'your_google_clientSecret',
        'callbackURL'      : 'https://whispering-earth-51586.herokuapp.com/auth/google/callback'
        // 'callbackURL'      : 'https://c07299b3567a4670bd2b3f3216bf2d59.vfs.cloud9.us-east-1.amazonaws.com/auth/google/callback'
    }

};


// http://localhost:8080/auth/google/callback

// https://whispering-earth-51586.herokuapp.com/auth/google/callback
