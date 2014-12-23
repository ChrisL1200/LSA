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
  medianListing: Number,
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
    state: { type: String, index: true },
    city: { type: String, index: true },
    zip: { type: String, index: true }
  }
});

SchoolSchema.set('autoIndex', false)
module.exports = mongoose.model('School', SchoolSchema);