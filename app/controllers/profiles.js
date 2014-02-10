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
    Profile.findOne({ _id: id })
    .populate('stores')
    .exec(function (err, profile) {

        if (err) {
            return next(err);

        } else if (!profile) {
            return next(new Error('Failure loading profile: ' + id));

        } else {
            req.loadedProfile = profile;
            next();
        }
    });    
};

/**
 *
 */
exports.lazyLoad = function (req, res, next, id) {
    Profile.findOne({ _id: id })
    .exec(function (err, profile) {

        if (err) {
            return next(err);

        } else if (!profile) {
            return next(new Error('Failure loading profile: ' + id));

        } else {
            req.loadedProfile = profile;
            next();
        }
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
    return res.json(req.loadedProfile);
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