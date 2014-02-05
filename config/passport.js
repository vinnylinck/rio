/* jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    config = require('./index');


module.exports = function(passport) {
    
    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });
    
    // Use local strategy
    passport.use(new LocalStrategy({
        
        usernameField: 'username',
        passwordField: 'password'
        
    }, function (username, password, done) {
        
        // try to find the user
        User.findOne({ username: username }, function(err, user) {
            
            var failed;
            
            // in case of error, fail it... case else, try to authenticate.
            if (err) {
                return done(err);
                
            } else {
                
                // check the user object and try to authenticate to detect failures.
                failed = ( !user ? true : !user.authenticate(password) );
                
                if (failed) {
                    return done(null, false, { message: 'Invalid credentials' });
                } else {
                    return done(null, user);
                }   
            }
        });
        
    }));
};