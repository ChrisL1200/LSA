/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var fs = require('fs');
var config = require('./environment');
var User = require('../api/user/user.model');
var Token = require('../api/token/token.model');
var Advertisement = require('../api/advertisement/advertisement.model');

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
  },
  {
    "isActive": false,
    "name": "Colette Waller",
    "phone": "+1 (946) 531-2593",
    "website": "http://www.google.com",
    "licenseNumber": 63326,
    "email": "colettewaller@applideck.com",
    "realtyName": "EXOSTREAM",
    "paidInterests": {
      "zips": [
        20151
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": false,
    "name": "Karina Crane",
    "phone": "+1 (880) 574-2282",
    "website": "http://www.google.com",
    "licenseNumber": 41098,
    "email": "karinacrane@exostream.com",
    "realtyName": "SOFTMICRO",
    "paidInterests": {
      "zips": [
        22066,
        22031
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": false,
    "name": "Claudine Harper",
    "phone": "+1 (870) 407-3903",
    "website": "http://www.google.com",
    "licenseNumber": 37934,
    "email": "claudineharper@softmicro.com",
    "realtyName": "COLUMELLA",
    "paidInterests": {
      "zips": [
        20166,
        20171,
        22124
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": true,
    "name": "Emily Herman",
    "phone": "+1 (881) 595-3400",
    "website": "http://www.google.com",
    "licenseNumber": 59455,
    "email": "emilyherman@columella.com",
    "realtyName": "MAGNEATO",
    "paidInterests": {
      "zips": [
        20120
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": true,
    "name": "Berta Bean",
    "phone": "+1 (830) 596-2423",
    "website": "http://www.google.com",
    "licenseNumber": 83795,
    "email": "bertabean@magneato.com",
    "realtyName": "EXOTECHNO",
    "paidInterests": {
      "zips": [
        22033
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": false,
    "name": "Hoover Hardy",
    "phone": "+1 (865) 564-3768",
    "website": "http://www.google.com",
    "licenseNumber": 49427,
    "email": "hooverhardy@exotechno.com",
    "realtyName": "COSMETEX",
    "paidInterests": {
      "zips": [
        20169,
        20148
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": false,
    "name": "Melton Fields",
    "phone": "+1 (990) 485-3487",
    "website": "http://www.google.com",
    "licenseNumber": 23381,
    "email": "meltonfields@cosmetex.com",
    "realtyName": "COREPAN",
    "paidInterests": {
      "zips": [
        20175,
        22030
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  },
  {
    "isActive": true,
    "name": "Erma Goodman",
    "phone": "+1 (958) 446-2048",
    "website": "http://www.google.com",
    "licenseNumber": 4900,
    "email": "ermagoodman@corepan.com",
    "realtyName": "HOPELI",
    "paidInterests": {
      "zips": [
        20198
      ]
    },
    "role": "agent",
    "password": "admin",
    "picture": "http://placehold.it/32x32"
  }, function() {
      console.log('finished populating users');
    }
  );
});

Advertisement.find({}).remove(function() {
  Advertisement.create({
    company: 'Buy our stuff Inc.',
    url:'http://www.buyourstuff.com',
    paidInterests: {
      zips: [22032]
    }
  }, function(err, doc) {
    fs.readFile('images/advertisement.png', function (err, data) {
      var code = doc._id.toString().hashCode();
      if (err) throw err;
      fs.writeFile(config.imageLocation + (code % 10000).toString() + '/' + code.toString() + '.png', data);
    });
  });
});

Token.find({}).remove(function() {
  Token.create({
      expire: new Date(),
      refresh:"4k6us8i0odbso9aa7jkf2jd47",
      access:"2npqqwq6ym1x1q3ms1uvvsh7t"
    });
});

String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    var character = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+character;
    hash = hash & hash; // Convert to 32bit integer
  }
  if(hash < 0) {
    hash = hash * -1;
  }
  return hash;
};