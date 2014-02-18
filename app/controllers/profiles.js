/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    mBuilder = require('../../utils/messageBuilder'),
    _ = require('lodash');

/**
 *
 */
exports.load = function (req, res, next, id) {
    Profile.load(id, function (err, profile) {

        if (err || !profile) {
            return res.json(  mBuilder.buildPreConditionFailure(id) );
        }

        req.loadedProfile = profile;
        next();

    });    
};

/**
 *
 */
exports.lazyLoad = function (req, res, next, id) {
    Profile.lazyLoad(id, function (err, profile) {

        if (err || !profile) {
            return res.json(  mBuilder.buildPreConditionFailure(id) );
        }

        req.loadedProfile = profile;
        next();

    }); 
};

/**
 *
 */
exports.all = function (req, res) {
    Profile.find({}, function(err, profiles) {
        return res.json( mBuilder.buildQuickResponse(err, null, profiles) );
    });
};

/**
 *
 */
exports.getProfile = function (req, res) {
    var err = (req.loadedProfile ? undefined : 404);
    return res.json( mBuilder.buildQuickResponse(err, "Profile not found", req.loadedProfile));
};

/**
 *
 */
exports.update = function (req, res, next) {
    var profile = req.loadedProfile;

    profile = _.extend(profile, req.body);

    profile.save(function(err) {
        res.json( mBuilder.buildQuickResponse(err, 'Unexpected error updating profile.', profile) );
    });
};