var app = require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/InDentConnect'; // for local

mongoose.connect(connectionString)

require('./services/user.service.server');
