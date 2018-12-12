var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = require('./Message');
var postSchema = require('./Post');

// Circle schema
var circleSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  chat: [messageSchema],
  wall: [postSchema]
});

module.exports = mongoose.model('Circle', circleSchema);
