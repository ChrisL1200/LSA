'use strict';

angular.module('cruvitaApp')
  .service('Homes', function Homes($resource) {

    var homes = $resource('/api/homes', {}, {
    	retrieve: {method: 'POST', isArray:true}
    });

    return homes;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
