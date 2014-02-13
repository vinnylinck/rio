/* jslint node: true */
'use strict';

var mBuilder = require('../../../utils/messageBuilder'),
    mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    _ = require('lodash');

/**
 * Check if user is a full system admin
 */
exports.isAdmin = function(req, res, next) {
    if (!req.user.admin) {
        return res.json( mBuilder.buildNotAuthorized() );
    }
    next();
};

/**
 * Check if user is the logged one
 */
exports.isMe = function(req, res, next) {
    if ( !(req.user.admin || req.user._id == req.params.userId) ) {
        return res.json( mBuilder.buildNotAuthorized() );
    }
    next();
};



/**
 * Generic authentication check routing middleware
 */
exports.requiresAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json( mBuilder.buildNotAuthorized() );
    }
    next();
};

/**
 *
 */
exports.requiresStore = function(req, res, next) {
    
    // are you sure you have the store loaded?
    // don't forget to include :storeId parameter into your route or populate this object yourself...
    // and sure: ADMIN is ADMIN
    if (req.user.admin) {
        next();
    } else if (!req.loadedStore) {
        return res.json( mBuilder.buildPreConditionFailure() );
    } else {
        
        // time to load current user profile to check things...
        Profile.load(req.user.profile, function(err, profile) {
            
            var found = false;
            
            // if profile was not found, return error
            if (err || !profile) {
                return res.json( mBuilder.buildPreConditionFailure(req.user.profile) );
            } else {
                
                // going tru stores
                _(profile.stores).forEach(function (store) {
                    
                    if (req.loadedStore._id.equals(store._id)) {
                        found = true;
                        next();
                    }
                });
                
                // if not found the store permission, not authorized
                if (!found) {
                    return res.json( mBuilder.buildNotAuthorized() );
                }
                
            }
        });
        
    }
};

/**
 *
 */
exports.requiresProfile = function (req, res, next) {
    if (req.user.admin || (req.user.profile.equals(req.loadedProfile._id)) ) {
        next();
    } else {
        return res.json( mBuilder.buildNotAuthorized() );
    }
};