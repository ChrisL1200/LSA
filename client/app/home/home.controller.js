'use strict';

angular.module('cruvitaApp')
  .controller('HomeCtrl', function ($scope, Location) {
  	$scope.getLocation = Location.autocomplete;
  	$scope.getResults = function() {
      Location.getResults($scope.locationSelected);
	  }
  });
