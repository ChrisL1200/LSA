'use strict';

var _ = require('lodash');
var Score = require('./score.model'),
    url = require('url'),
    inside = require('point-in-polygon');

// Get list of scores
exports.index = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  // {"ed_level": new RegExp(query.gradeLevel)}
  Score.find()
  .sort({'score': -1})
  .where('coordinates.latitude').gt(query.southwestLat).lt(query.northeastLat)
  .where('coordinates.longitude').gt(query.southwestLong).lt(query.northeastLong)
  .limit(25)
  .exec(function (err, scores) {
    if(err) { return handleError(res, err); }
    return res.json(200, scores);
  });
};

// Get a single score
exports.show = function(req, res) {
  Score.findById(req.params.id, function (err, score) {
    if(err) { return handleError(res, err); }
    if(!score) { return res.send(404); }
    return res.json(score);
  });
};

// Creates a new score in the DB.
exports.create = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  // {"ed_level": new RegExp(query.gradeLevel)}
  Score.find()
  .sort({'score': -1})
  .where('coordinates.latitude').gt(query.southwestLat).lt(query.northeastLat)
  .where('coordinates.longitude').gt(query.southwestLong).lt(query.northeastLong)
  .limit(25)
  .exec(function (err, scores) {
    if(err) { return handleError(res, err); }
    var filteredScores = [];
    var polygonsPresent = req.body.polygons && req.body.polygons.length > 0;
    if(polygonsPresent) {
      _.each(req.body.polygons, function(poly) {
        _.each(scores, function(score) {
          if(inside([score.coordinates.latitude, score.coordinates.longitude], poly)) {
            filteredScores.push(score);
          }
        });
      });
    }
    return res.json(200, polygonsPresent ? filteredScores : scores);
  });  
};

// Updates an existing score in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Score.findById(req.params.id, function (err, score) {
    if (err) { return handleError(err); }
    if(!score) { return res.send(404); }
    var updated = _.merge(score, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, score);
    });
  });
};

// Deletes a score from the DB.
exports.destroy = function(req, res) {
  Score.findById(req.params.id, function (err, score) {
    if(err) { return handleError(res, err); }
    if(!score) { return res.send(404); }
    score.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}