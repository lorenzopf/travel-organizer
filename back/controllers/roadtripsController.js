
const RoadTrip = require('../models/roadTripModel');

exports.roadTrip = function (req,res) {

    RoadTrip.findById(req.params.id_road_trip).then((roadTrip) => {
            if (roadTrip) {
                res.status(200).json({
                        id: roadTrip._id,
                        title: roadTrip.title,
                        citiesName: roadTrip.citiesName,
                        budget: roadTrip.budget ,
                        cities: roadTrip.cities,
                        places: roadTrip.places ,
                        dates: roadTrip.dates,
                        likes: roadTrip.likes})
            } else {
                res.status(204).json({ message: "this roadTrip doesn't exist" });
            }
        }).catch(function (error) {
            console.log(error);
        });

}

exports.roadTrips = function (req,res) {
    console.log(req);
    RoadTrip.find({}, function (err, roadTrips) {
        let roadTripMap = {};

        roadTrips.forEach(function (roadTrip) {
            roadTripMap[roadTrip._id.toString()] = {
                id: roadTrip._id,
                title: roadTrip.title,
                citiesName: roadTrip.citiesName,
                budget: roadTrip.budget ,
                cities: roadTrip.cities,
                places: roadTrip.places ,
                dates: roadTrip.dates,
                likes: roadTrip.likes}


        });
        res.status(200).json(roadTrips);
    })
}

exports.userRoadTrips = function (req,res) {
console.log(req);
    RoadTrip.find({user_id: req.params.user_id}, function (err, roadTrips) {
        let roadTripMap = {};
        roadTrips.forEach(function (roadTrip) {
            roadTripMap[roadTrip._id.toString()] = {
                id: roadTrip._id,
                title: roadTrip.title,
                citiesName: roadTrip.citiesName,
                budget: roadTrip.budget ,
                cities: roadTrip.cities,
                places: roadTrip.places ,
                dates: roadTrip.dates
            }
        });
        res.status(200).json(roadTrips);
    })
}

exports.createRoadTrip = function (req,res,next) {

    let title        = req.body.title;
    let budget      = req.body.budget;
    let cities      = req.body.cities;
    let citiesName      = req.body.citiesName;
    let places      = req.body.places;
    let dates      = req.body.dates;
    let user_id      = req.body.user_id;

    const newRoadTrip = new RoadTrip({
        title: title,
        citiesName: citiesName,
        budget: budget,
        cities:cities,
        places: places,
        dates: dates,
        user_id: user_id
    });

    newRoadTrip.save().then((roadTrip) => {

        res.status(200).json({ success: true, id: roadTrip.id, create_date: roadTrip.create_date });
    }).catch(err => next(err));
}

exports.editRoadTrip = function (req,res) {

    let title        = req.body.title;
    let budget      = req.body.budget;
    let citiesName  = req.body.citiesName;
    let cities      = req.body.cities;
    let places      = req.body.places;
    let dates      = req.body.dates;


    RoadTrip.findByIdAndUpdate(req.body.road_trip_id, {
        title: title,
        citiesName: citiesName,
        budget: budget,
        cities:cities,
        places: places,
        dates:dates
    }, function (err) {
        if (err) {
            res.status(204).send(err)
        } else {
            res.status(200).json({ success: true});
        }
    });

}

exports.deleteRoadTrip = function (req,res) {
    RoadTrip.findByIdAndDelete(req.params.road_trip_id, function (err, result) {
        if (err) {
            res.status(204).send(err);
        } else {
            res.status(200).json({ message: "this road trip has been deleted" })
        }
    })
}

