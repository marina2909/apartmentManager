var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var parseUrlEncoded = bodyParser.json();

var mongoose = require('mongoose');
var Armenities = mongoose.model('Armenities');


router.route('/')
    .post(parseUrlEncoded, function(request, response, next) {
        var newBody = request.body;
        var name = newBody.name;
        newBody.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        var armenities = new Armenities(newBody);

        armenities.save(function(err, armenity) {
            if (err) {
                var error = new Error();
                error.message = "Error executing  POST call to /armenities";
                next(error);
            } else {
                response.status(201).json(newBody.name);
            }
        });
    })
    .get(function(request, response, next) {
        Armenities.find(function(err, armenities) {
            if (err) {
                var error = new Error();
                error.message = "Error executing  GET call to /armenities";
                next(error);
            } else {
                response.json(armenities);
            }
        });
    });


router.use(function log(err, req, res, next) {
    res.status(500);
    res.send(err.message);
});

module.exports = router;