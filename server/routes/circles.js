var express = require('express');
var router = express.Router();
var Circle = require('../models/Circle');

// Get all circles
router.get('/', function (req, res) {
  Circle
    .find({members: req.user._id}, 'owner name members')
    .populate('owner', 'username')
    .exec(function (err, circles) {
      if (err)
        return res.status(404).json(err);

      res.status(200).json(circles);
    });
});

// Create new circle
router.post('/', function (req, res) {
  var circle = new Circle({
    owner: req.user._id,
    name: req.body.name,
    members: [req.user._id]
  });

  circle.save(function (err, circle) {
    if (err)
      return res.status(500).json(err);

    res.status(201).json(circle);
  });
});

// Delete circle
router.delete('/:id', function (req, res) {
  var id = req.params.id;

  Circle.findById(id, function (err, circle) {
    if (err)
      return res.status(500).json(err);

    if (!circle.owner.equals(req.user._id))
      return res.status(401).json({message: 'Only the circle creator can delete this circle'});

    circle.remove(function (err, circle) {
      if (err)
        return res.status(500).json(err);

      res.status(204).json(circle);
    });
  })
});

module.exports = router;
