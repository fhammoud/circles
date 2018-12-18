var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  time: Date
});

module.exports = imageSchema;
