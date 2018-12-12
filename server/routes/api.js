var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var users = require('../routes/users');
var circles = require('../routes/circles');
var chat = require('../routes/chat');
var posts = require('../routes/posts');
var User = require('../models/User');

router.use('/users', users);

router.use('/', function (req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res.status(401).json(err);

    User.findById(decoded.user._id, function (err, user) {
      if (err)
        return res.status(500).json(err);

      if (!user)
        return res.status(401).json('Unauthorized');

      req.user = user;
      next();
    });
  });
});

router.use('/circles', circles);
router.use('/chat', chat);
router.use('/posts', posts);

module.exports = router;
