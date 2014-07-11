// Initialize cron jobs
// var http = require('http'),
// 	xml2js = require('xml2js'),
// 	url = require('url'),
// 	config = require('../config/config'),
// 	parser = new xml2js.Parser();

// var options = {
// 		host: 'www.zillow.com',
// 		path: '/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1b6epidczrf_8p8sy&address='
// };

// var callback = function(response) {
// 	var completeResponse = '';
//     response.on('data', function (chunk) {
//         completeResponse += chunk;
//     });
//     response.on('end', function() {
//     	console.log(completeResponse);
// 		parser.parseString(completeResponse, function (err, result) {
// 			res.send(result);
// 		});
//     });
// };

// http.request(options, callback).end();

// Trulia: t8jq2cezcuhsaybmq6a33kdu
var zips = ["20112"];

var CronJob = require('cron').CronJob;
var job = new CronJob('00 * * * * *', function(){
	var schoolAverageHomePrices = {};
	// Iterate through all states (Trulia) -> Iterate through all cities (Trulia) -> Iterate through all neighborhoods (Trulia)
	for(var i = 0; i < zips.length; i++) {

	  // Get all houses for sale (Zillow)

	    // Iterate over all houses (Paging as well)

	      // Get nearby schools (Great Schools)

	      // Update average home price per school (schoolAverageHomePrices)

	      // Get school test data / metadata (Great Schools or Education.com) if school hasn't been retrieved

	}

    // Iterate over schoolAverageHomePrices

      // Calculate LSA

      // Store in mongo temp collection

    // Delete lsa collection

    // Rename temp to lsa collection

    console.log("Every minute");
  }, function () {},
  true /* Start the job right now */,
  "America/Los_Angeles" /* Time zone of this job. */
);