var express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
var Circle = require('../models/Circle');
var fs = require('fs');

// Create new image
router.post('/:circle', function (req, res, next) {
  var circle = req.params.circle;
  var img = req.body.image.split(',')[1];
  var buffer = Buffer.from(img, 'base64');

  var image = {
    _id: new ObjectID(),
    owner : req.user._id,
    image: {
      data: buffer,
      contentType: 'image/png'
    },
    time: new Date()
  };

  Circle.update({_id: circle}, {$push: {album: image}})
    .then(function (result) {
      res.status(201).json(image);
    })
    .catch(function (err) {
      next(err);
    });
});

// Get images
router.get('/', function (req, res, next) {
  Circle.find({ _id: req.query.circleId })
    .select('album')
    .populate('album.owner', 'username')
    .exec()
    .then(function (album) {
      res.status(200).json(album);
    })
    .catch(function (err) {
      next(err)
    });
});

module.exports = router;
