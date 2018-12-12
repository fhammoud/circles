var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Message schema
var messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: Date
});

module.exports = messageSchema;
