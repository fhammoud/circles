var mongoose = require('mongoose');

// Get DB URL based on environment
// May want to add .env file
var url = process.env.NODE_ENV === 'development'
  ? process.env.MONGODB_URI_DEV
  : process.env.MONGODB_URI;

// Connect to DB
mongoose.connect(url);

// Mongoose event handlers
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to', url);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error:', err.message);
});

// Process event handlers
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});
