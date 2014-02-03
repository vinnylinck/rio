/* jslint node:true */
'use strict';

module.exports = function usersRoutes(app) {
    var users = require('../controllers/users');
    
    app.get('/users/signin', users.signin);
    app.get('/users/signout', users.signout);
};