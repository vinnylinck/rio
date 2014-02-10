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
    }
});

mongoose.model('Store', StoreSchema);