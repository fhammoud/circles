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
    .then(function () {
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

// Get image
router.get('/:id', function (req, res, next) {
  Circle.findOne({"album._id": req.params.id})
    .select({"album": {$elemMatch: {"_id": req.params.id}}})
    .exec()
    .then(function (result) {
      res.status(200).json(result.album[0]);
    })
    .catch(function (err) {
      next(err);
    });
});

// Delete post
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;

  Circle.findOne({"album._id": id})
    .then(function (circle) {
      for (var i = 0; i < circle.album.length; i++) {
        if (circle.album[i]._id.equals(id)) {
          if (!circle.album[i].owner.equals(req.user._id)) {
            res.status(401);
            throw new Error('Only the post creator can delete this post');
          }

          circle.album.splice(i, 1);
          return circle.save();
        }
      }
    })
    .then(function () {
      return res.status(200).json({message: "deleted"});
    })
    .catch(function (err) {
      next(err);
    });
});

module.exports = router;
