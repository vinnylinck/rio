/* jslint node:true */
'use strict';

module.exports = function profileRoutes(app) {
    var profiles = require('../controllers/profiles'),
        authorization = require('./middlewares/authorization.js');
    
    app.get('/profiles', authorization.requiresAuth, authorization.isAdmin, profiles.all);                          //*** Retrieve all profiles
    app.get('/profiles/:profileId', authorization.requiresAuth, authorization.isMe, profiles.getProfile);           //*** Return profile
    app.get('/lazy/profiles/:lazyProfId', authorization.requiresAuth, profiles.getProfile);                         //*** Return profile in "lazy mode"
    app.put('/lazy/profiles/:lazyProfId', authorization.requiresAuth, profiles.update);                             //*** Add store to profile 
    
    // preparing params
    app.param('profileId', profiles.load);
    app.param('lazyProfId', profiles.lazyLoad);
};