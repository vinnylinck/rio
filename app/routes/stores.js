/* jslint node:true */
'use strict';

module.exports = function storesRoutes(app) {
    var stores = require('../controllers/stores'),
        authorization = require('./middlewares/authorization.js');
    
    app.get('/stores/:id', authorization.requiresAuth, stores.getStore);
};