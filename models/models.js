var mongoose = require('mongoose');

var guestsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
});

var armenitiesSchema = new mongoose.Schema({
    name: String,
    active: Boolean
});

var apartmentsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    size: String,
    rooms: Number,
    defaultOccupancy: Number,
    maxOccupancy: Number,
    armenities: [armenitiesSchema]
});

var bookingsSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        default: Date.now
    },
    arrivalDate: {
        type: Date,
        default: Date.now
    },
    departureDate: {
        type: Date,
        default: Date.now
    },
    arrivalTime: String,
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartments'
    },
    guests: [{
        type: String,
        ref: 'Guests'
    }]
});



// TO DO do services request
mongoose.model("Guests", guestsSchema);
mongoose.model("Apartments", apartmentsSchema);
mongoose.model("Armenities", armenitiesSchema);
mongoose.model("Bookings", bookingsSchema);