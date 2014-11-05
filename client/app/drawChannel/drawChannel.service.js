'use strict';

angular.module('cruvitaApp')
  .service('drawChannel', function(channel) {
  	return new channel();
  });
