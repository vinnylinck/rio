/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    mBuilder = require('../../utils/messageBuilder'),
    _ = require('lodash');


/**
 *
 */
exports.load = function (req, res, next, id) {
    Category.load(id, function (err, category) {

        if (err || !category) {
            return res.json(  mBuilder.buildPreConditionFailure(id) );
        }
        req.loadedCategory = category;
        next();
    });    
};

/**
 *
 */
exports.lazyLoad = function (req, res, next, id) {
    Category.lazyLoad(id, function (err, category) {

        if (err || !category) {
            return res.json(  mBuilder.buildPreConditionFailure(id) );
        }
        req.loadedCategory = category;
        next();
    });    
};

/*
 *
 */
exports.getCategory = function (req, res) {
};

/*
 *
 */
exports.update = function (req, res) {
};