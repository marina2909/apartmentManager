var express = require('express');
var bodyParser = require('body-parser');
var helper = require('./misc.js');
var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Apartments = mongoose.model('Apartments');
var Armenities = mongoose.model('Armenities');

var sendErrorResponse = function(next, status, msg) {
    var error = new Error();
    error.status = status;
    error.message = "Executing call to /apartments. " + msg;
    next(error);
}

router.route('/')
    .post(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;
        var name = newBody.name;
        newBody.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        var apartments = new Apartments(newBody);
        apartments.save(function(err, apartment) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            } else {
                response.status(201).json(newBody.name);
            }
        });
    })
    .get(function(request, response, next) {
        Apartments.find(function(err, apartments) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            if (!apartments || apartments.length == 0) {
                sendErrorResponse(next, 204, 'No content');
                return;
            }
            response.json(apartments);
        });
    });

router.route('/:id')
    .all(function(request, response, next) {
        request.apartmentID = request.params.id;
        next();
    })
    .get(function(request, response) {
        Apartments.findOne({
            _id: request.apartmentID
        }, function(err, apartment) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            response.json(apartment);
        });
    })
    .put(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;

        // fetch by id
        Apartments.findOne({
            _id: request.apartmentID
        }, function(err, apartment) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            if (!apartment) {
                sendErrorResponse(next, 404, 'Record is not found');
                return;
            }
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
                    sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                    next(error);
                } else {
                    response.status(200).json(apartment);
                }
            });

        });
    })
    .delete(function(request, response) {

        Apartments.findOne({
            _id: request.apartmentID
        }, function(err, apartment) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            if (!apartment) {
                sendErrorResponse(next, 404, 'Apartment not found.');
                return;
            }

            Apartments.findOneAndRemove({
                _id: request.apartmentID
            }, function(err2) {
                if (err2) {
                    sendErrorResponse(next, 400, helper.getDatabaseMessages(err2));
                    return;
                }
                response.status(200).send("Resource deleted");
            });

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