/* jslint node:true */
'use strict';

module.exports = function usersRoutes(app, passport) {
    var users = require('../controllers/users'),
        authorization = require('./middlewares/authorization.js');
    
    app.post('/users', users.create);
    app.get('/users/me', users.me);
    
    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local'), users.handleSession);
    app.delete('/users/session', users.signOut);
};