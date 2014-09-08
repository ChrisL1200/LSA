var CronJob = require('cron').CronJob;
var Trulia = require('./apis/trulia');
var Zillow = require('./apis/zillow');
var Education = require('./apis/education');
var Score = require('../api/score/score.model');
var Boundary = require('../api/boundary/boundary.model');
var _ = require('lodash');

var zipCodes = ["22030", "22031", "22032"];
// var job = new CronJob('00 * * * * *', function(){
exports.init = function() {
	console.log("Starting LSA Calculations...");
	Score.remove({}, function(err) {  
	var schoolAverageHomePrices = {};
	// Iterate through all states (Trulia) -> Iterate through all zips (Trulia)
	// Trulia.getZipCodesInState("VA", function(zipCodes) {
		_.each(zipCodes, function(zipCode) {
			// Get all zip code data (Zillow)
			Education.schoolSearch(zipCode, function(schools) {
				console.log(schools);
				_.each(JSON.parse(schools), function(parsedSchool) {
					if(parsedSchool.school) {
						Boundary.findOne({nces_schid:parsedSchool.school.nces_id}).exec(function (err, boundary) {
							Score.create({
						  		coordinates: {
						  			latitude: parsedSchool.school.latitude,
						  			longitude: parsedSchool.school.longitude
						  		},	
						  		zipCode: parseInt(parsedSchool.school.zip),
						  		scores: {
						  			total: parsedSchool.school.studentteacherratio.total
						  		},
						  		school: {
						  			name: parsedSchool.school.schoolname,
		  							gradelevel: parsedSchool.school.gradelevel,
		  							id: parsedSchool.school.schoolid
						  		},
						  		path: boundary.wkt
							});
						});
					}
				});
			});
		});
	// });
	});
}
//   }, function () {},
//   true /* Start the job right now */,
//   "America/Los_Angeles" /* Time zone of this job. */
// );