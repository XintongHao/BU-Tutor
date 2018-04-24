// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'googleAuth' : {
        'clientID'         : '740586361455-0tm8id9rv4u8abu58pd05qq4gsj2k0fv.apps.googleusercontent.com',
        'clientSecret'     : '7ZgOzbwSfneiZrFnrnx06mrZ',
        'callbackURL'      : 'https://whispering-earth-51586.herokuapp.com/auth/google/callback'
        // 'callbackURL'      : 'https://c07299b3567a4670bd2b3f3216bf2d59.vfs.cloud9.us-east-1.amazonaws.com/auth/google/callback'
    }

};


// http://localhost:8080/auth/google/callback

// https://whispering-earth-51586.herokuapp.com/auth/google/callback