'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchoolSchema = new Schema({
  mx_id: String,
  nces_disid: String,
  nces_schid: String,
  sch_name: String,
  ed_level: String,
  phone: String,
  color: String,
  freeLunch: Number,
  redLunch: Number,
  member: Number,
  income: Number,
  titleOne: String,
  stRatio: Number,
  score: {
    realEstate: Number,
    school: Number,
    overall: Number
  },
  relver: String,
  allReading: String,
  allMath: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  wkt: [{
    latitude: Number,
    longitude: Number
  }],
  address: {
    street: String,
    state: String,
    city: String,
    zip: Number,
    county: String
  }
});

module.exports = mongoose.model('School', SchoolSchema);