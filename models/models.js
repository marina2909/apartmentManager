var mongoose = require('mongoose');

var guestsSchema = new mongoose.Schema({
		name : String,
		birthdate : String,
		nationality : String
});

var apartmentsSchema = new mongoose.Schema({
	name : String,
	price : String,
	description : String,
	size: String,
	rooms: Number,
	defaultOccupancy: Number,
	maxOccupancy: Number,
	services: [String]
});

// TO DO do services request
mongoose.model("Guests", guestsSchema);
mongoose.model("Apartments", apartmentsSchema);
