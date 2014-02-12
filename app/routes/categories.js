/* jslint node: true */
'use strict';

module.exports = function storesRoutes(app) {
    var categories = require('../controllers/categories'),
        authorization = require('./middlewares/authorization.js');
    
    // categories info
    app.get('/categories/:catId', authorization.requiresAuth, categories.getCategory);
    
    // update category info - REQUIRES ADMIN PRIVILEGES
    app.put('/categories/:lazyCatId', authorization.requiresAuth, authorization.isAdmin, categories.update);
    
    // setting parameters
    app.param('catId', categories.load);
    app.param('lazyCatId', categories.lazyLoad);
};