var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/User');

// Register new user
router.post('/', function (req, res, next) {
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user.save()
    .then(function (user) {
      var token = jwt.sign({user: user}, process.env.SECRET, {expiresIn: 7200});
      return res.status(201).json(token);
    })
    .catch(function (err) {
      res.status(409);
      err.message = "Nope! That's someone else.";
      return next(err);
    })
});

// Login user
router.post('/login', function(req, res, next) {
  var user = {};

  User.findOne({ username: req.body.username })
    .then(function(result) {
      if (!result) {
        res.status(401);
        throw new Error('Are you sure you entered the right username and password?');
      }
      user = result;
      return bcrypt.compare(req.body.password, result.password);
    })
    .then(function (success) {
      if (!success) {
        res.status(401);
        throw new Error('Are you sure you entered the right username and password?');
      }

      var token = jwt.sign({user: user}, process.env.SECRET, {expiresIn: 7200});
      return res.status(200).json(token);
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
