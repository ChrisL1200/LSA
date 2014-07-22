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