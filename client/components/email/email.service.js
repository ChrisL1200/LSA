'use strict';

angular.module('cruvitaApp')
  .service('email', function ($resource) {
  	var email = $resource('/api/email', {}, {
    	send: {method: 'POST', isArray: false}
  	});

    return email;
  });
