/* jslint node: true */
'use strict';

module.exports = function storesRoutes(app) {
    var categories = require('../controllers/categories'),
        authorization = require('./middlewares/authorization.js');
    
    // categories info
    app.get('/categories/:catId', authorization.requiresAuth, categories.getCategory);
};