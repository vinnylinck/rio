/* jslint node:true */
'use strict';

module.exports = function usersRoutes(app) {
    var users = require('../controllers/users');
    
    app.get('/users/me', users.me);
    app.post('/users', users.create);
};