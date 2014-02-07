/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    mBuilder = require('../../utils/messageBuilder');



exports.all = function all(req, res) {
    
    Profile.find({}, function(err, profiles) {
        return res.json( mBuilder.buildQuickResponse(err, null, profiles) );
    });
};

exports.getProfile = function getProfile(req, res) {
    
    Profile.findOne( { _id: req.params.id }, function(err, profile) {
        return res.json( mBuilder.buildQuickResponse(err, null, profile) );
    });
};


exports.getRawProfile = function getRawProfile(req, res) {
    
    Profile.findOne( { _id: req.params.id }, function(err, profile) {
        return res.json( mBuilder.buildQuickResponse(err, null, profile) );
    });
};


exports.addStore = function addStore(req, res) {
};