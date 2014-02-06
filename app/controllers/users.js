/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    mBuilder = require('../../utils/messageBuilder');

exports.me = function usersMe(req, res) {
    res.json( mBuilder.buildQuickResponse(null, null, req.user.getMetadata()) );
};

exports.create = function usersCreate(req, res) {
    var user = new User(req.body),
        result;
    
    user.provider = 'local';
    user.save( function saveUser(err, inserted) {
        result = mBuilder.buildQuickResponse(err);
        return res.json(result);
    });
};

exports.handleSession = function usersSession(req, res, next) {
    var err, msg;
    
    // validate a "possible" session establishing failure itself
    if (!req.user) {
        err = 'internal error when establishing connection with server.';
        msg = 'An unexpected error happend when opening connection with server using your account. Please contact support for more details.';
        return res.json(mBuilder.buildQuickResponse(err, msg));
    } 
    
    // make passportjs setup the user object, serialize the user, ...
    req.login(req.user, {}, function(err) {
        if (err) { 
            return next(err); 
        }
        return res.redirect("/users/me");
    });
};

exports.signOut = function usersSignOut(req, res, next) {
    
    // logout only changes session.auth flag, but doesn't remove from database.
    // Calling destroy will remove the cookie, which means the browser will do that as well, 
    // invalidating the session.
    req.logOut();
    req.session.destroy();
    res.json( mBuilder.buildQuickResponse() );   
};