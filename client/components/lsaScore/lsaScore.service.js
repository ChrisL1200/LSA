'use strict';

angular.module('lsaApp')
  .service('Lsascore', function Lsascore($resource) {
    var lsaScore = $resource('/api/scores', {}, {
    	get: {method: 'GET', isArray:true}
    });

    return lsaScore;
  });
