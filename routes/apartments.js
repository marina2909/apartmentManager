var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Apartments = mongoose.model('Apartments');

// var apartments = [
//   {
//     name : 'Apartment 1',
//     price: '30$',
//     description: 'This is very nice apartment',
//     size: '60m2',
//     rooms: 3,
//     defaultOccupancy: 2,
//     maxOccupancy: 4,
//     services: [ 'wifi', 'laundry']
//   },
//   {
//     name : 'Apartment 2',
//     price: '50$',
//     description: 'This is middle size apartment',
//     size: '64m2',
//     rooms: 2,
//     defaultOccupancy: 3,
//     maxOccupancy: 5,
//     services: [ 'wifi', 'airconditioning']
//   },
//   {
//     name : 'Apartment3',
//     price: '60$',
//     description: 'This is the biggest apartment',
//     size: '90m2',
//     rooms: 1,
//     defaultOccupancy: 2,
//     maxOccupancy: 4,
//     services: [ 'dishwasher', 'laundry' ]
//   }
// ];


router.route('/')
.put(parseUrlEncoded, function(request, response, next){
  var newBody = request.body;
  var name = newBody.name;
  newBody.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
  var apartments = new Apartments(newBody);
  apartments.isNew = false;
  apartments.save(function(err, apartment){
   if (err){
     var error = new Error();
     error.message = "Error executing  PUT call to /apartments /n" + err;
     next(error);
   } else {
     response.status(201).json(newBody.name);
   }
 });
})
.get(function(request, response, next){
  Apartments.find(function(err, apartments){
    if (err){
      var error = new Error();
      error.message = "Error executing  GET call to /apartments";
      next(error);
    } else {
      response.json(apartments);
    }
  });
});



router.route('/:name')
.all(function(request, response, next){
	var name = request.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	request.apartmentName = block;
	next();
})
.get(function(request, response){
  Apartments.find({name : request.apartmentName}, function(err, apartment){
    if (err){
      var error = new Error();
      error.message = "Error executing  GET call to /apartments/"+request.apartmentName;
      next(error);
    } else {
      response.json(apartment[0]);
    }
  });
})
.delete(function(request, response){
  Apartments.findOneAndRemove({name : request.apartmentName}, function(err){
    if (err){
      var error = new Error();
      error.message = "Error deleting apartment with name "+request.guestName + '/n' + err;
      next(error);
    } else {
      response.status(200).send("Resource deleted");
    }
  })
});


router.use(function log(err, req, res, next) {
	res.status(500);
	res.send(err.message);
});

module.exports = router;
