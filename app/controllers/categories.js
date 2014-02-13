/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    mBuilder = require('../../utils/messageBuilder'),
    _ = require('lodash');
/*
 *
 */
exports.getCategory = function (req, res) {
    
};

/**
 *
 */
exports.update = function (req, res, next) {
    var category = req.loadedCategory;

    category = _.extend(category, req.body);

    category.save(function(err) {
        res.json( mBuilder.buildQuickResponse(err, 'Unexpected error updating category.', category) );
    });
};