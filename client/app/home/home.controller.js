'use strict';

angular.module('cruvitaApp')
  .controller('HomeCtrl', function ($scope, Location) {
  	$scope.getLocation = Location.autocomplete;
  	$scope.getResults = function() {
      console.log($scope.locationSelected);
      Location.getResults($scope.locationSelected);
	  }
  });
