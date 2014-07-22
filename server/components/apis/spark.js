// http://api.education.com/service/service.php?f=schoolSearch&key=23cbcf09d914ed637cb83a306959287d&sn=sf&v=4&zip=94526&resf=json

var http = require('http'),
	url = require('url'),
	config = require('../../config/environment');

//9cqeuf6znrk7zbtldrfr40ieo
// curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "r4pjgm1lhd7e7d2cbbplzz16","client_secret":  "3xa3sv9zrfjd3yg6d6xkq5h74","grant_type": "authorization_code","code": "9cqeuf6znrk7zbtldrfr40ieo", "redirect_uri": "https://post-office-project.herokuapp.com"}'
// {"expires_in":86400,"refresh_token":"4k6us8i0odbso9aa7jkf2jd47","access_token":"2npqqwq6ym1x1q3ms1uvvsh7t"}
exports.registerToken = function() {
	
}