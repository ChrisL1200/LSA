'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
  company: String,
  url: String
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);