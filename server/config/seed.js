/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Token = require('../api/token/token.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Token.find({}).remove(function() {
  Token.create({
      expire: new Date(),
      refresh:"4k6us8i0odbso9aa7jkf2jd47",
      access:"2npqqwq6ym1x1q3ms1uvvsh7t"
    });
});

//   When User selects "View Homes"
//1. Find furthest boundary point from lat/long of school, find distance between points
//2. Query Spark with lat/long and radius.
//3. Filter results not in boundary
//4. Return filtered result set
var inside = require('point-in-polygon');
var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [2,3], [ 3,3 ], [ 2, 1 ], [ 1, 1 ] ];

console.dir([
    inside([ 1.5, 1.5 ], polygon),
    inside([ 4.9, 1.2 ], polygon),
    inside([ 1.8, 1.1 ], polygon)
]);

var pattern = /High/;
console.log(pattern.exec("High,Middle"));