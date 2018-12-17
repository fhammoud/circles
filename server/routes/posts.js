var express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
var Circle = require('../models/Circle');

// Create a new post
router.post('/:circle', function (req, res) {
  var circle = req.params.circle;

  var post = {
    _id: new ObjectID(),
    owner : req.user._id,
    content: req.body.content,
    time: new Date()
  };

  Circle.update({_id: circle}, {$push: {wall: post}}, function (err, result) {
    if (err)
      return res.status(500).json(err);

    post.sender = req.user.username;
    res.status(201).json(post);
  })
});

// Get posts
router.get('/', function (req, res) {
  Circle.find({ _id: req.query.circleId }, 'name wall')
    .populate('wall.owner', 'username')
    .exec(function (err, wall) {
      if (err)
        return res.status(500).json(err);

      res.status(200).json(wall);
    });
});

// Get post
router.get('/:id', function (req, res) {
  Circle.findOne({"wall._id": req.params.id})
    .select({"wall": {$elemMatch: {"_id": req.params.id}}})
    .exec(function (err, result) {
      if (err)
        return res.status(500).json(err);

      res.status(200).json(result.wall[0]);
    })
});

// Update post
router.put('/:id', function (req, res) {
  var id = req.params.id;
  var content = req.body.content;

  Circle.findOne({"wall._id": id}, function (err, circle) {
    if (err)
      return res.status(500).json(err);

    for (var i = 0; i < circle.wall.length; i++) {
      if (circle.wall[i]._id.equals(id)) {
        if (!circle.wall[i].owner.equals(req.user._id))
          return res.status(401).json({message: 'Only the post creator can edit this post'});

        circle.wall[i].content = content;
        circle.wall[i].time = new Date();
        circle.save(function (err, circle) {
          if (err)
            return res.status(500).json(err);

          return res.status(200).json({message: "edited"});
        });
      }
    }
  });
});

// Delete post
router.delete('/:id', function (req, res) {
  var id = req.params.id;

  Circle.findOne({"wall._id": id}, function (err, circle) {
    if (err)
      return res.status(500).json(err);

    for (var i = 0; i < circle.wall.length; i++) {
      if (circle.wall[i]._id.equals(id)) {
        if (!circle.wall[i].owner.equals(req.user._id))
          return res.status(401).json({message: 'Only the post creator can delete this post'});

        circle.wall.splice(i, 1);
        circle.save(function (err, circle) {
          if (err)
            return res.status(500).json(err);

          return res.status(200).json({message: "deleted"});
        });
      }
    }
  });
});

module.exports = router;
