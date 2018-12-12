var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/User');

router.post('/', function (req, res) {
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user.save(function(err, user) {
    if (err)
      return res.status(500).json({message: "Nope! That's someone else."});

    var token = jwt.sign({user: user}, process.env.SECRET, {expiresIn: 7200});
    return res.status(201).json(token);
  });
});

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err)
      return res.status(500).json(err);

    if (!user)
      return res.status(401).json({message: 'Are you sure you entered the right username and password?'});

    bcrypt.compare(req.body.password, user.password)
      .then(function (success) {
        if (!success)
          return res.status(401).json({message: 'You sure you entered the right username and password?'});

        var token = jwt.sign({user: user}, process.env.SECRET, {expiresIn: 7200});
        return res.status(200).json(token);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
  });
});

module.exports = router;
