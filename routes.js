'use strict';

module.exports = function(app) {
    var userController = require('./controllers/UserController');
    var curriculumController = require('./controllers/CurriculumController');

    app.route('/users')
        .get(userController.users);
        
    app.route('/register')
        .post(userController.register);

    app.route('/login')
        .post(userController.login);

    app.route('/completeprofile')
        .post(userController.login);

    app.route('/curriculum')
        .get(curriculumController.curriculum);

    app.route('/curriculum/:id/')
        .get(curriculumController.curriculumById);

    app.route('/curriculum/create')
        .post(curriculumController.create);
    
    app.route('/curriculum/update')
        .post(curriculumController.update);

    app.route('/curriculum/delete/:id/')
        .post(curriculumController.deleteById)
};