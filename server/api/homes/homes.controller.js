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
  perPage: 100,
  delta  : 3,
  page   : 1
};

// Get list of homess
exports.index = function(req, res) {
  return res.json(200, []);
};

// Get a single homes
exports.show = function(req, res) {
  var userQuery = User.find({})
  .where('role').equals('agent')
  .select('email name');
  var userParams = [];
  async.series({
    home: function(callback){
      Homes.findById(req.params.id)
      .populate('schools.elementary')
      .populate('schools.middle')
      .populate('schools.high')
      .exec(function (err, home) {
        userParams.push({'paidInterests.zips':home.listing.address.postalcode});
        callback(null, home);
      });   
    },
    agent: function(callback){
      userQuery.or(userParams).exec(function (err, users) {
        callback(null, users);
      }); 
    }
  },
  function(err, results) {
    return res.send(200, results);
  });
};

// Creates a new homes in the DB.
exports.create = function(req, res) {
  var userQuery = User.find({})
  .where('role').equals('agent')
  .select('email name');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var homeQuery = Homes.find()
  .select('listing.photos.photo listing.listprice listing.listingkey listing.score listing.address listing.bedrooms listing.bathrooms listing.livingarea listing.propertysubtype listing.location.latitude listing.location.longitude');

  _.each(req.body.queries, function(query) {
    switch(query.type) {
      case 'equals':
        if(!query.caseSensitive) {
          query.value = query.value.toUpperCase();
        }
        homeQuery.where(query.key).equals(query.value);
        break;
      case 'range':
        homeQuery.where(query.key).gt(parseFloat(query.min)).lt(parseFloat(query.max));
        break;
      case 'min':
        homeQuery.where(query.key).gt(parseFloat(query.value))
        break;
      case 'max':
        homeQuery.where(query.key).lt(parseFloat(query.value))
        break;
      case 'type':
        if(query.rental && !query.forSale) {
          homeQuery.where('listing.propertytype').equals('Rental');
        }
        if(query.forSale && !query.rental) {
          homeQuery.where('listing.propertytype').ne('Rental');
        }
        if(!query.forSale && !query.rental) {
          homeQuery.exists('listing.propertytype', false);
        }
        break;
      default:
        break;
    }
  });

  function homesCallback(err, homes, callback) {
    if(err) { return handleError(res, err); }
    var filteredHomes = [];
    var polygonsPresent = req.body.polygons && req.body.polygons.length > 0;
    if(polygonsPresent) {
      _.each(req.body.polygons, function(poly) {
        _.each(homes.results, function(home) {
          if(inside([home.listing.location.latitude, home.listing.location.longitude], poly)) {
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

  function agentsCallback(callback, userParams) {
    userQuery.or(userParams).exec(function (err, users) {
      callback(null, users);
    });
  }
  var postalcodes = _.where(req.body.queries, { 'key': 'listing.address.postalcode' });
  var userParams = [];
  if(postalcodes.length === 0) {
    async.series({
      homes: function(callback){
        homeQuery.paginate(pageOptions, function (err, homes) {
          _.each(_.deepPluck(homes.results, 'listing.address.postalcode'), function(postalcode) {
            if(_.where(userParams, { 'paidInterests.zips':postalcode }).length === 0) {
              userParams.push({'paidInterests.zips':postalcode});
              console.log(postalcode);
            }
          });
          homesCallback(err, homes, callback);
        });
      },
      agents: function(callback){
        agentsCallback(callback, userParams);
      }
    },
    function(err, results) {
      return res.send(200, results);
    });
  }
  else {
    userParams.push({'paidInterests.zips':postalcodes[0].value});
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