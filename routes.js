'use strict';

module.exports = function(app) {
    var userController = require('./controllers/UserController');

    app.route('/')
        .get(userController.index);

    app.route('/users')
        .get(userController.users);
};