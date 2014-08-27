var content;
var fs = require('fs');
var counter = 0;
var _ = require('lodash');
var Boundary = require('../api/boundary/boundary.model');
// First I want to read the file
Boundary.remove({}, function(err) { 
fs.readFile('./data/maponics_sample_us_school_districts_wkt.txt', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
    var content = data.split('\r\n');
    var insertion = false;
    var keys = [];
    var object = {};
    _.forEach(content, function(val) {
    	_.forEach(val.split('|'), function(value, index){
    	if(insertion) {
	    	if(value.split(' ')[0] === "MULTIPOLYGON") {
	    		var latLongs = value.replace('MULTIPOLYGON ', "").replace("(((", "").replace(")))", "").split(", ");
	    		var path = [];
	    		_.forEach(latLongs, function(latLong) {
	    			var splitCoord = latLong.split(" ");
	    			path.push({ latitude: parseFloat(splitCoord[1]), longitude: parseFloat(splitCoord[0])});
	    		});
	    		object[keys[index]] = path;
	    		Boundary.create(object);
	    	}
	    	else {
	    		object[keys[index]] = value;	
	    	}
    	}
    	else {
    		keys.push(value);
    	}

    	});
    	insertion = true;
    	object = {};
    })
});
});