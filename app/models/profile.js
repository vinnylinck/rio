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

mongoose.model('Profile', ProfileSchema);