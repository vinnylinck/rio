/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    mBuilder = require('../../utils/messageBuilder'),
    _ = require('lodash');


/**
 *
 */
exports.load = function (req, res, next, id) {
    User.findOne({ _id: id }, '-salt -hashed_password')
    .populate('profile')
    .populate('stores')
    .exec(function (err, user) {

        if (err || !user) {
            return res.json( mBuilder.buildPreConditionFailure(id) );
        }

        req.loadedUser = user;
        next();
    });
};

/**
 *
 */
exports.me = function (req, res) {
    var result = ( req.user ? req.user.getMetadata() : {} );
    res.json( mBuilder.buildQuickResponse(null, null, result) );
};

/**
 *
 */
exports.create = function (req, res) {
    var user = new User(req.body),
        result;

    user.provider = 'local';
    user.save( function saveUser(err, inserted) {
        result = mBuilder.buildQuickResponse(err);
        return res.json(result);
    });
};

/**
 *
 */
exports.signIn = function (req, res, next) {
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

/**
 *
 */
exports.signOut = function (req, res, next) {
    // logout only changes session.auth flag, but doesn't remove from database.
    // Calling destroy will remove the cookie, which means the browser will do that as well, 
    // invalidating the session.
    req.logOut();
    req.session.destroy();
    res.json( mBuilder.buildQuickResponse() );   
};


/**
 *
 */
exports.getUser = function (req, res, next) {
    res.json(req.loadedUser);
};

/**
 *
 */
exports.update = function (req, res, next) {
    var user = req.loadedUser;

    user = _.extend(user, req.body);

    user.save(function(err) {
        res.json( mBuilder.buildQuickResponse(err, 'Unexpected error updating user.', user) );
    });
};

/**
 *
 */
exports.setWorkingStore = function (req, res, next) {
    
    // retrieving preferences
    req.session.preferences = (req.session.preferences || {});
    
    // setting working store
    req.session.preferences.workingStore = req.loadedStore;
    
    // saving it
    req.session.save();
    
    
    
};
