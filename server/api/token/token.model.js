'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TokenSchema = new Schema({
  expire: Date,
  refresh: String,
  access: String
});

module.exports = mongoose.model('Token', TokenSchema);