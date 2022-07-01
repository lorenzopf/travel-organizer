'use strict';

module.exports = function (app) {


    const passportJWT = require('../auth/jwtAuth');
    const userController = require('../controllers/userController');
    const locationController = require('../controllers/locationController');
    const roadtripsController = require('../controllers/roadtripsController');

    app.route('/users').get(passportJWT.authenticate('jwt', { session: false }), userController.users);
    app.route('/user/login').post(userController.users_login);
    app.route('/user/logout').get(passportJWT.authenticate('jwt', { session: false }), function (req, res) {
        req.logout();
        res.json({ success: true });
    });

    app.route('/user/signup').post(userController.users_create);
    app.route('/user/:id_user').get(passportJWT.authenticate('jwt', { session: false }), userController.user);
    app.route('/user/edit').patch(passportJWT.authenticate('jwt', { session: false }), userController.users_update);
    app.route('/user/:id_user/delete').delete(passportJWT.authenticate('jwt', { session: false }), userController.users_delete);


    /**
     * Roadtrip's route
     */


    app.route('/roadtrips').get(roadtripsController.roadTrips);
    app.route('/roadtrip/:id_road_trip').get(roadtripsController.roadTrip);
    app.route('/user/roadtrips/:user_id').get(roadtripsController.userRoadTrips);
    app.route('/create/roadtrips').post(roadtripsController.createRoadTrip);
    app.route('/edit/roadtrip').patch(roadtripsController.editRoadTrip);
    app.route('/delete/roadtrips/:id_road_trip').delete(roadtripsController.deleteRoadTrip);

    /**
     * Filters
     */
    app.route('/find').get(locationController.find);
    app.route('/all').post(locationController.all);
    app.route('/enjoy').post(locationController.enjoy);
    app.route('/sleep').post(locationController.sleep);
    app.route('/travel').post(locationController.travel);
    app.route('/eat').post(locationController.eat);
    app.route('/drink').post(locationController.drink);

}