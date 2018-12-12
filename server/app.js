// Require dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');

// Require app routes
var index = require('./routes/index');
var api = require('./routes/api');

// Connect to DB
require('./db');

// Start express
var app = express();

// Use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', api);

// Catch all other requests and return index
app.use('*', index);

module.exports = app;
