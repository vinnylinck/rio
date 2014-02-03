/* jslint node: true */
'use strict';

/** 
 *  Module Dependencies
 */
var express = require('express');

/**
 *  Main application entry file.
 *  Please be aware that the order of loading matters...
 */

// Setting node environment vars in case they are not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Loading server modules
var lHelper = require('./utils/loadHelper.js'),
    config = require('./config/index.js');

// Configuring Express
var app = express();
require('./config/express')(app);

// Bootstraping routes
lHelper.walk(__dirname + '/app/routes', [app]);

// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Retail Insight Orchestrator started on port ', port);

// exporting app to node context
exports = module.exports = app;