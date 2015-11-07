var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Apartments = mongoose.model('Apartments');
var Armenities = mongoose.model('Armenities');
var DATABASE_ERROR = "API database error : ";

router.route('/')
    .post(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;
        var name = newBody.name;
        newBody.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        var apartments = new Apartments(newBody);
        apartments.save(function(err, apartment) {
            if (err) {
                var error = new Error();
                error.message = DATABASE_ERROR + "Executing  POST call to /apartments";
                next(error);
            } else {
                response.status(201).json(newBody.name);
            }
        });
    })
    .get(function(request, response, next) {
        Apartments.find(function(err, apartments) {
            if (err) {
                var error = new Error();
                error.message = DATABASE_ERROR + "Executing  GET call to /apartments";
                next(error);
            } else {
                response.json(apartments);
            }
        });
    });

router.route('/:name')
    .all(function(request, response, next) {
        var name = request.params.name;
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.apartmentName = block;
        next();
    })
    .get(function(request, response) {
        Apartments.find({
            name: request.apartmentName
        }, function(err, apartment) {
            if (err) {
                var error = new Error();
                error.message = DATABASE_ERROR + "Executing  GET call to /apartments/" + request.apartmentName;
                next(error);
            } else {
                response.json(apartment[0]);
            }
        });
    })
    .put(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;
        var name = newBody.name;
        var apartment;
        newBody.name = name[0].toUpperCase() + name.slice(1).toLowerCase();

        // fetch by name
        Apartments.find({
            name: request.apartmentName
        }, function(err, apartm) {
            if (err) {
                var error = new Error();
                error.message = DATABASE_ERROR + "Executing  PUT call to /apartments /n" + err;
                next(error);
            } else {
                apartment = apartm[0];
                // prepare for update
                apartment.price = newBody.price;
                apartment.description = newBody.description;
                apartment.size = newBody.size;
                apartment.rooms = newBody.rooms;
                apartment.defaultOccupancy = newBody.defaultOccupancy;
                apartment.maxOccupancy = newBody.maxOccupancy;
                apartment.armenities = newBody.armenities;

                // do update
                var apartments = new Apartments(apartment);
                apartments.isNew = false;
                apartments.save(function(err, apartment) {
                    if (err) {
                        var error = new Error();
                        error.message = DATABASE_ERROR + "Executing  PUT call to /apartments /n" + err;
                        next(error);
                    } else {
                        response.status(200).json(newBody.name);
                    }
                });
            }
        });
    })
    .delete(function(request, response) {
        Apartments.findOneAndRemove({
            name: request.apartmentName
        }, function(err) {
            if (err) {
                var error = new Error();
                error.message = DATABASE_ERROR + "Deleting apartment with name " + request.guestName + '/n' + err;
                next(error);
            } else {
                response.status(200).send("Resource deleted");
            }
        });
    });

// catch 404
router.use(function(req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handler
router.use(function log(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = router;