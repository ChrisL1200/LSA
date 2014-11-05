'use strict';

angular.module('lsaApp')
  .service('School', function School($resource) {
  	var school = $resource('/api/schools', {}, {
    	get: {method: 'GET', isArray:true},
    	retrieve: {method: 'POST', isArray: true}
    });

    return school;
  });