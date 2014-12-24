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
    state: String,
    city: String,
    zip: String
  }
});

SchoolSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
SchoolSchema.index({ 'address.state': 1, 'address.city': 1 });
module.exports = mongoose.model('School', SchoolSchema);

// mongoexport --db lsa-dev --collection schools --csv --out schools.csv -f nces_schid,medianListing,income,nces_disid,sch_name,ed_level,phone,freeLunch,redLunch,member,mx_id,titleOne,stRatio,score.realEstate,score.school,school.overall,relver,allReading,allMath,address.street,address.state,address.city,address.zip