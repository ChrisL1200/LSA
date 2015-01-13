'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
  company: String,
  paidInterests: {
    zips: [ String ]
  },
  expiration: Date,
  url: String
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);