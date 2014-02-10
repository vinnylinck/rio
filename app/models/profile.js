/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Profile Schema
 */
var ProfileSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    stores: [{
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }]
});

/**
 * Statics
 */
ProfileSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
    .populate('stores')
    .exec(cb);
};

ProfileSchema.statics.lazyLoad = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Profile', ProfileSchema);