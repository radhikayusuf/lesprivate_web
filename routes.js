'use strict';

module.exports = function(app) {
    var userController = require('./controllers/UserController');

    app.route('/users')
        .get(userController.users);
        
    app.route('/register')
        .post(userController.register);

    app.route('/login')
        .post(userController.login);

        app.route('/completeprofile')
        .post(userController.login);

};