var app = require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/webdev'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    console.log('here');
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds161487.mlab.com:61487/heroku_qqmcl53h'; // user yours
}

mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/task.service.server');
