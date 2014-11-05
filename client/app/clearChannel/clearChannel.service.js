'use strict';

angular.module('cruvitaApp')
  .service('clearChannel', function(channel) {
  	return new channel();
  });
