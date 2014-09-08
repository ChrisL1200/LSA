'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  coordinates: {
  	latitude: Number,
  	longitude: Number
  },
  zipCode: Number,
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

module.exports = mongoose.model('School', ScoreSchema);