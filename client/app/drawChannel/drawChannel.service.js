'use strict';

angular.module('lsaApp')
  .service('drawChannel', function(channel) {
  	return new channel();
  });
