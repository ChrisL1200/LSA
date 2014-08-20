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

var CronJob = require('cron').CronJob;
var Trulia = require('./apis/trulia');
var Zillow = require('./apis/zillow');
var Education = require('./apis/education');
var Score = require('../api/score/score.model');
// var job = new CronJob('00 * * * * *', function(){
	Score.remove({}, function(err) {  
	var schoolAverageHomePrices = {};
	// Iterate through all states (Trulia) -> Iterate through all zips (Trulia)
	Trulia.getZipCodesInState("VA", function(zipCodes) {
		for(var i = 0; i < zipCodes.length; i++) {
			// Get all zip code data (Zillow)
			Education.schoolSearch(zipCodes[i].name[0], function(schools) {
				var parsedSchools = JSON.parse(schools);
				for(var j = 0; j < parsedSchools.length; j++) {
					Score.create({
				  		coordinates: {
				  			latitude: parsedSchools[j].school.latitude,
				  			longitude: parsedSchools[j].school.longitude
				  		},
				  		zipCode: parseInt(parsedSchools[j].school.zip),
				  		scores: {
				  			total: parsedSchools[j].school.studentteacherratio.total
				  		},
				  		school: {
				  			name: parsedSchools[j].school.schoolname,
  							gradelevel: parsedSchools[j].school.gradelevel,
  							id: parsedSchools[j].school.schoolid
				  		}
					});
				}
			});
			// Zillow.getDemographics(zipCodes[i].name[0], function(demographics){
			// 	console.log(demographics.pages[0].page[0].tables[0].table[0].data[0].attribute[0].values[0].nation[0].value[0]["_"]);
			// 	var score = (500000 - parseInt(demographics.pages[0].page[0].tables[0].table[0].data[0].attribute[0].values[0].nation[0].value[0]["_"]))/40000;
			// 	Score.create({
			// 	  coordinates: {
			// 	  	latitude: parseFloat(demographics.region[0].latitude[0]),
			// 	  	longitude: parseFloat(demographics.region[0].longitude[0])
			// 	  },
			// 	  zipCode: parseInt(demographics.region[0].zip[0]),
			// 	  scores: {
			// 	  	total: score
			// 	  }
			// 	});	
			// });

	      // Get nearby schools (Education.com)

	      // Get school test data / metadata (Education.com) if school hasn't been retrieved
		}
	});
});
//   }, function () {},
//   true /* Start the job right now */,
//   "America/Los_Angeles" /* Time zone of this job. */
// );