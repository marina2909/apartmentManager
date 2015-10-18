var express = require('express');
var app = express();
var passport = require('passport');


var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/manageDb");
require('./models/models.js');

var guests = require('./routes/guests');
var apartments = require('./routes/apartments');
var bookings = require('./routes/bookings');
var armenities = require('./routes/armenities');
app.use(express.static('public'));

app.use('/guests', guests);
app.use('/apartments', apartments);
app.use('/bookings', bookings);
app.use('/armenities', armenities);

app.listen(3000, function(){
	console.log('Listenig on port 3000');
});
