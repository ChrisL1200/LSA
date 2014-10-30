'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchoolSchema = new Schema({
  coordinates: {
  	latitude: Number,
  	longitude: Number
  },
  phone: String,
  scores: {
  	total: Number
  },
  school: {
  	name: String,
  	gradelevel: String,
  	id: String
  },
  path: [{
    latitude: Number,
    longitude: Number
  }]
});

module.exports = mongoose.model('School', SchoolSchema);