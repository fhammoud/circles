var express = require('express');
var router = express.Router();
var Circle = require('../models/Circle');

// Get messages from chat
router.get('/:circle', function(req, res) {
  Circle.find({ _id: req.params.circle }, 'name chat')
    .populate('chat.sender', 'username')
    .exec(function (err, chat) {
    if (err)
      return res.status(500).json(err);

    res.status(200).json(chat);
  });
});

// Add message to chat
router.post('/:circle', function(req, res) {
  var message = {
    sender: req.body.sender,
    content: req.body.content,
    time: new Date()
  };

  Circle.update(
    { _id: req.params.circle },
    { $push: {'chat': message}}, function (err) {
    if (err)
      return res.status(500).json(err);

    message.sender = req.user.username;
    res.status(201).json(message);
  });
});

module.exports = router;
