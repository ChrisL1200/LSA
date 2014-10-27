'use strict';

angular.module('lsaApp')
  .service('clearChannel', function(channel) {
  	return new channel();
  });
