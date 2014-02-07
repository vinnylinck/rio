/* jslint node:true */
'use strict';

module.exports = function profileRoutes(app) {
    var profiles = require('../controllers/profiles'),
        authorization = require('./middlewares/authorization.js');
    
    app.get('/profiles', authorization.requiresAuth, profiles.all);
    app.get('/profiles/:id', authorization.requiresAuth, profiles.getProfile);
    app.get('/profiles/raw/:id', authorization.requiresAuth, profiles.getRawProfile);
    app.post('/profiles/:id/store', authorization.requiresAuth, profiles.addStore);
};