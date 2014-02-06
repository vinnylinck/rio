/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var StoreSchema = new Schema({
    storeId: {
        type: String,
        unique: true
    },
    name: String,
    coords: {
        lat: String,
        lon: String
    }
});

mongoose.model('Store', StoreSchema);