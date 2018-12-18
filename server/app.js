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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', api);

// Catch all other requests and return index
app.use('*', index);

// Error handler
app.use(function (err, req, res, next) {
  console.log(err);
  var status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);
  res.json({ message: err.message });
});

module.exports = app;
