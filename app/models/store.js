/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 *vStore Schema
 */
var StoreSchema = new Schema({
    extId: {
        type: String,
        unique: true
    },
    name: String,
    coords: {
        lat: String,
        lon: String
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

/**
 * Statics
 */
StoreSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
    .populate('categories')
    .exec(cb);
};

StoreSchema.statics.lazyLoad = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Store', StoreSchema);