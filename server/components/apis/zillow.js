// http://www.zillow.com/webservice/GetDemographics.htm?zws-id=<ZWSID>&state=WA&city=Seattle&neighborhood=Ballard

var http = require('http'),
	xml2js = require('xml2js'),
	url = require('url'),
	config = require('../../config/environment'),
	parser = new xml2js.Parser();

exports.getDemographics = function(zip, callback) {
	var options = {
			host: 'www.zillow.com',
			path: '/webservice/GetDemographics.htm?zws-id=' + config.zillow.key + '&zip=' + zip 
	};

	var httpCallback = function(response) {
		var completeResponse = '';
	    response.on('data', function (chunk) {
	        completeResponse += chunk;
	    });
	    response.on('end', function() {
			parser.parseString(completeResponse, function (err, result) {
				if(result["Demographics:demographics"].response) {
					callback(result["Demographics:demographics"].response[0]);
				}
			});
	    });
	};

	http.request(options, httpCallback).end();
}