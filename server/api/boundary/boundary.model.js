'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoundarySchema = new Schema({
  mx_id: String,
  nces_disid: String,
  suprv_id: String,
  distname: String,
  distwbsite: String,
  dist_type: String,
  dist_schs: String,
  dist_enrl: String,
  coextensiv: String,
  part_cov: String,
  color: String,
  state: String,
  statefips: String,
  relver: String,
  wkt: [{
  	latitude: Number,
  	longitude: Number
  }]
});

module.exports = mongoose.model('Boundary', BoundarySchema);