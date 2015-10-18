var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Bookings = mongoose.model('Bookings');
var DATABASE_ERROR = "API database error : ";

router.route('/')
.post(parseUrlEncoded, function(request, response, next){
  var newBody = request.body;
  var bookings = new Bookings(newBody);
  bookings.save(function(err, booking){
    if (err){
      var error = new Error();
      error.message = "Error executing  POST call to /bookings";
      next(error);
    } else {
      response.status(201).json('Booking created');
    }
  });
})
.get(function(request, response, next){
  Bookings.find({})
    .populate('apartment')
    .exec(function(err, bookings){
      if (err){
        var error = new Error();
        error.message = "Error executing  GET call to /bookings";
        next(error);
      } else {
        response.json(bookings);
      }
    });
});


router.route('/:id')
.get(function(request, response){
  Bookings.findById(request.params.id, function(err, booking){
    if (err){
      var error = new Error();
      error.message = DATABASE_ERROR + "Executing  GET call to /bookings/" + request.params.id;
      next(error);
    } else {
      response.json(booking);
    }
  });
})
.delete(function(request, response){
  Bookings.findOneAndRemove({id : request.params.ide}, function(err){
    if (err){
      var error = new Error();
      error.message = DATABASE_ERROR + "Deleting bookinng with id " + request.params.id;
      next(error);
    } else {
      response.status(200).send("Resource deleted");
    }
  })
})


router.use(function log(err, req, res, next) {
	res.status(500);
	res.send(err.message);
});

module.exports = router;
