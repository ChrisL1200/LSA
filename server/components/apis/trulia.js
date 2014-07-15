var http = require('http'),
	xml2js = require('xml2js'),
	url = require('url'),
	config = require('../../config/environment'),
	parser = new xml2js.Parser();

exports.getZipCodesInState = function(state, callback) {
	var httpCallback = function(response) {
		var completeResponse = '';
	    response.on('data', function (chunk) {
	        completeResponse += chunk;
	    });
	    response.on('end', function() {
			parser.parseString(completeResponse, function (err, result) {
				callback(result.TruliaWebServices.response[0].LocationInfo[0].zipCode);
			});
	    });
	};

	var options = {
		host: 'api.trulia.com',
		path: '/webservices.php?library=LocationInfo&function=getZipCodesInState&apikey=' + config.trulia.key + '&state=' + state
	};

	http.request(options, httpCallback).end();
}

// http://api.trulia.com/webservices.php?library=TruliaStats&function=getZipCodeStats&zipCode=94002&startDate=2009-02-06&endDate=2009-02-07&apikey=abc123

exports.getZipCodesStats = function(zipCode, callback) {
	var httpCallback = function(response) {
		var completeResponse = '';
	    response.on('data', function (chunk) {
	        completeResponse += chunk;
	    });
	    response.on('end', function() {
			parser.parseString(completeResponse, function (err, result) {
				if(result.TruliaWebServices && result.TruliaWebServices.response) {
					callback(result.TruliaWebServices.response[0].TruliaStats[0]);
				}
			});
	    });
	};

	var options = {
		host: 'api.trulia.com',
		path: '/webservices.php?library=TruliaStats&function=getZipCodeStats&startDate=2013-07-14&endDate=2014-07-14&statType=listings&apikey=' + config.trulia.key + '&zipCode=' + zipCode
	};

	http.request(options, httpCallback).end();
}