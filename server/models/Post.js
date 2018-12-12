var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = require('./Message');

var postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chat: [messageSchema],
  time: Date
});

module.exports = postSchema;
