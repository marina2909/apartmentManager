var mongoose = require('mongoose');

var guestsSchema = new mongoose.Schema({
		name : { type : String, required: true },
		birthdate : { type : String, required: true },
		nationality : { type : String, required: true }
});

var apartmentServicesSchema = new mongoose.Schema({
    name: String,
		active: Boolean
});

var apartmentsSchema = new mongoose.Schema({
	name : String,
	price : String,
	description : String,
	size: String,
	rooms: Number,
	defaultOccupancy: Number,
	maxOccupancy: Number,
	services: [apartmentServicesSchema]
});



// TO DO do services request
mongoose.model("Guests", guestsSchema);
mongoose.model("Apartments", apartmentsSchema);
mongoose.model("ApartmentServices", apartmentServicesSchema);
