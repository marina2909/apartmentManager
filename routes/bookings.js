var express = require('express');
var bodyParser = require('body-parser');
var helper = require('./misc.js');
var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Bookings = mongoose.model('Bookings');
var DATABASE_ERROR = "API database error : ";

var sendErrorResponse = function(next, status, msg) {
    var error = new Error();
    error.status = status;
    error.message = "Executing call to /bookings. " + msg;
    next(error);
}

router.route('/')
    .post(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;
        var bookings = new Bookings(newBody);
        bookings.save(function(err, booking) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            response.status(201).json(booking);
        });
    })
    .get(function(request, response, next) {
        Bookings.find({})
            .populate('apartment')
            .exec(function(err, bookings) {
                if (err) {
                    sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                    return;
                }
                if (!bookings || bookings.length == 0) {
                    sendErrorResponse(next, 204, 'No content');
                    return;
                }
                response.json(bookings);
            });
    });


router.route('/:id')
    .get(function(request, response) {
        Bookings.findById(request.params.id, function(err, booking) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            if (!booking) {
                sendErrorResponse(next, 404, 'Record is not found');
                return;
            }
            response.json(booking);

        });
    })
    .put(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;
        Bookings.findOne({
            _id: request.params.id
        }, function(err, booking) {

            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }

            if (!booking) {
                sendErrorResponse(next, 404, 'Booking not found.');
                return;
            }

            //prepare for update
            booking.arrivalTime = newBody.arrivalTime;
            booking.apartment = newBody.apartment;
            booking.arrivalDate = newBody.arrivalDate;
            booking.departureDate = newBody.departureDate;


            // do update
            var bookings = new Bookings(booking);
            bookings.isNew = false;
            bookings.save(function(err, booking) {
                if (err) {
                    sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                    return;
                }
                booking.__v = undefined;
                response.status(200).json(booking);
            });

        });

    })
    .delete(function(request, response) {
        Bookings.findOne({
            _id: request.params.id
        }, function(err, booking) {
            if (err) {
                sendErrorResponse(next, 400, helper.getDatabaseMessages(err));
                return;
            }
            if (!booking) {
                sendErrorResponse(next, 404, 'Booking not found.');
                return;
            }

            Bookings.findOneAndRemove({
                _id: request.params.id
            }, function(err2) {
                if (err2) {
                    sendErrorResponse(next, 400, helper.getDatabaseMessages(err2));
                    return;
                }
                response.status(200).send("Resource deleted");
            });

        });


    })


router.use(function log(err, req, res, next) {
    res.status(500);
    res.send(err.message);
});

module.exports = router;