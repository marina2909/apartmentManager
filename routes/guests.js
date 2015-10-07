var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Guests = mongoose.model('Guests');

var guests = [
	{"name" : "Small1",
	"description" : "This is a bit small guest",
	"price" : "100$"
	},
	{"name" : "Small2",
	"description" : "This is a bit medium guest",
	"price" : "20$"
	},
	{"name" : "Small3",
	"description" : "This is a bit bigger guest",
	"price" : "30$"
	}
]

router.route('/')
	.get(function(request, response, next){
		Guests.find({}, function(err, guest){
			if (err){
				var error = new Error();
				error.message = "Error executing  GET call to /guests";
				next(error);
			} else {
				response.json(guest);
			}
		});
	})
	.post(parseUrlEncoded, function(request, response, next){
		var newBody = request.body;
		var name = newBody.name;
		newBody.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
		var guests = new Guests(newBody);
		guests.save(function(err, guest){
			if (err){
				var error = new Error();
				error.message = "Error executing  GET call to /guests";
				next(error);
			} else {
				response.status(201).json(newBody.name);
			}
		});

	});

/* router.route('/*', function(request, response, next){
	var error = new Error('Route not found! Try something else');
	error.status = 404;
	next(error);
});	 */
router.route('/:name')
	.all(function(request, response, next){
		var name = request.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		request.guestName = block;
		next();
	})
	.get(function(request, response){
		var obj = guests.filter(function(obj){
			return obj.name === request.guestName;
		});
		if (obj){
			response.json(description);
		}
	})
	.put(function(request, response){

	})
	.delete(function(request, response){
		Guests.findOneAndRemove({name : request.guestName}, function(err){
			if (err){
				console.log('err');
				var error = new Error();
				error.message = "Error deleting guest with name "+request.guestName;
				next(error);
			} else {
				response.status(200).send("Resource deleted");
			}
		})
	})
	.put(function(request, response){

	});


router.use(function log(err, req, res, next) {
	res.status(500);
	res.send(err.message);

});

module.exports = router;
