// http://api.education.com/service/service.php?f=schoolSearch&key=23cbcf09d914ed637cb83a306959287d&sn=sf&v=4&zip=94526&resf=json

var http = require('http'),
	url = require('url'),
	config = require('../../config/environment');

exports.schoolSearch = function(zip, callback) {
	var options = {
			host: 'api.education.com',
			path: '/service/service.php?f=schoolSearch&sn=sf&v=4&resf=json&key=' + config.education.key + '&zip=' + zip 
	};

	var httpCallback = function(response) {
		var completeResponse = '';
	    response.on('data', function (chunk) {
	        completeResponse += chunk;
	    });
	    response.on('end', function() {
			callback(completeResponse);
		});
	};

	http.request(options, httpCallback).end();
}

exports.getSchool = function(nces_id, callback) {
	var options = {
			host: 'api.education.com',
			path: '/service/service.php?f=schoolSearch&sn=sf&v=4&resf=json&key=' + config.education.key + '&nces_id=' + nces_id 
	};

	var httpCallback = function(response) {
		var completeResponse = '';
	    response.on('data', function (chunk) {
	        completeResponse += chunk;
	    });
	    response.on('end', function() {
			callback(completeResponse);
		});
	};

	http.request(options, httpCallback).end();	
}