/* jslint node:true */
'use strict';

module.exports = function usersRoutes(app, passport) {
    var users = require('../controllers/users');
    
    app.get('/users/me', users.me);
    app.post('/users', users.create);
    
    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local'), users.handleSession);
};