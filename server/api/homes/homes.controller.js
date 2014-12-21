'use strict';

var _ = require('lodash');
_.mixin(require("lodash-deep"));
var Homes = require('./homes.model');
var User = require('../user/user.model');
var url = require('url');
var async = require('async');
var inside = require('point-in-polygon');
require('mongoose-query-paginate');

var pageOptions = {
  perPage: 50,
  delta  : 3,
  page   : 1
};

// Get list of homess
exports.index = function(req, res) {
  return res.json(200, []); 
};

// Get a single homes
exports.show = function(req, res) {
  Homes.findById(req.params.id, function (err, home) {
    if(err) { return handleError(res, err); }
    if(!home) { return res.send(404); }
    return res.json(home);
  });
};

// Creates a new homes in the DB.
exports.create = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var sqFtMin = query.sqFtMin || 0;
  var sqFtMax = query.sqFtMax || 99999;
  var lotMin = query.lotMin || 0;
  var lotMax = query.lotMax || 99999;
  var bedMin = query.bedMin || 0;  
  var bedMax = query.bedMax || 99999;
  var bathMin = query.bathMin || 0;
  var bathMax = query.bathMax || 99999;
  var priceMin = query.priceMin || 0;
  var priceMax = query.priceMax || 99999999999;
  var queryObj = {};
  if(query.propertysubtype) {
    queryObj['listing.propertysubtype'] = query.propertysubtype;
  }
  var userParams = [];
  var homeQuery = Homes.find(queryObj)
  .where('listing.livingarea').gt(sqFtMin).lt(sqFtMax)
  .where('listing.lotsize').gt(lotMin).lt(lotMax)
  .where('listing.bedrooms').gt(bedMin).lt(bedMax)
  .where('listing.bathrooms').gt(bathMin).lt(bathMax)
  .where('listing.listprice').gt(priceMin).lt(priceMax)
  .select('listing.photos.photo listing.listprice listing.score listing.address listing.bedrooms listing.bathrooms listing.livingarea listing.propertysubtype listing.location.latitude listing.location.longitude')
  
  if(query.southwestLat && query.northeastLat && query.southwestLong && query.northeastLong) {  
    homeQuery.where('listing.location.latitude').gt(parseFloat(query.southwestLat)).lt(parseFloat(query.northeastLat))
    homeQuery.where('listing.location.longitude').gt(parseFloat(query.southwestLong)).lt(parseFloat(query.northeastLong))
  }
  if(query.locality) {
    userParams.push({'paidInterests.cities':query.locality.toUpperCase()});
    homeQuery.where('listing.address.city').equals(query.locality.toUpperCase());
  }
  if(query.administrative_area_level_1) {
    homeQuery.where('listing.address.stateorprovince').equals(query.administrative_area_level_1.toUpperCase());
  }
  if(query.postal_code) {
    userParams.push({'paidInterests.zips':query.postal_code});
    homeQuery.where('listing.address.postalcode').equals(query.postal_code);
  }
  var rental = query.rental && query.rental=='true';
  var forSale = query.forSale && query.forSale=='true';
  if(rental && !forSale) {
    homeQuery.where('listing.propertytype').equals('Rental');
  }
  if(forSale && !rental) {
    homeQuery.where('listing.propertytype').ne('Rental');
  }
  if(!forSale && !rental) {
    homeQuery.exists('listing.propertytype', false);
  }
  var userQuery = User.find({})
  .where('role').equals('agent')
  .select('email name');

  function homesCallback(err, homes, callback) {
    if(err) { return handleError(res, err); }
    var filteredHomes = [];
    var polygonsPresent = req.body.polygons && req.body.polygons.length > 0;
    if(polygonsPresent) {
      _.each(req.body.polygons, function(poly) {
        _.each(homes.results, function(home) {
          if(inside([home.listing.location[0].latitude[0], home.listing.location[0].longitude[0]], poly)) {
            filteredHomes.push(home);
          }
          else {
            console.log(home);
          }
        });
      });
      homes.results = filteredHomes;
    }
    callback(null, homes);
  }

  function agentsCallback(callback) {
    userQuery.or(userParams).exec(function (err, users) {
      callback(null, users);
    }); 
  }

  if(query.southwestLat && query.northeastLat && query.southwestLong && query.northeastLong) {  
    homeQuery.where('listing.location.latitude').gt(parseFloat(query.southwestLat)).lt(parseFloat(query.northeastLat));
    homeQuery.where('listing.location.longitude').gt(parseFloat(query.southwestLong)).lt(parseFloat(query.northeastLong));
    async.series({
      homes: function(callback){
        homeQuery.paginate(pageOptions, function (err, homes) {
          _.each(_.deepPluck(homes, 'listing.address.0.postalcode.0'), function(postalcode) {
            userParams.push({'paidInterests.zips':postalcode});
          });
          homesCallback(err, homes, callback);
        });    
      },
      agents: function(callback){
        agentsCallback(callback);
      }
    },
    function(err, results) {
      return res.send(200, results);
    });
  }
  else {
    async.parallel({
      agents: function(callback){
        agentsCallback(callback);
      },
      homes: function(callback){
        homeQuery.paginate(pageOptions, function (err, homes) {
          homesCallback(err, homes, callback);
        });
      }
    },
    function(err, results) {
      return res.send(200, results);
    });
  }
};

// Updates an existing homes in the DB.
exports.update = function(req, res) {
  console.log("update");  
};

// Deletes a homes from the DB.
exports.destroy = function(req, res) {
  
};

function handleError(res, err) {
  return res.send(500, err);
}