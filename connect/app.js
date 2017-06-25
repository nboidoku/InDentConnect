var app = require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/InDentConnect'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds051665.mlab.com:51665/heroku_096kzdbd'; // user yours
}

mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/task.service.server');
