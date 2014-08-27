'use strict';

angular.module('lsaApp')
  .service('Boundary', function Boundary($resource) {
    var boundary = $resource('/api/boundarys', {}, {
    	get: {method: 'GET', isArray:true}
    });

    return boundary;
  });
