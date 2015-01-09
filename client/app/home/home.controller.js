'use strict';

angular.module('cruvitaApp')
  .controller('HomeCtrl', function ($scope, Location, geolocation, $timeout) {
  	$scope.getLocation = Location.autocomplete;
  	$scope.getResults = function() {
      Location.getResults($scope.locationSelected);
	  };

    $scope.searchArea = function() {
    	$scope.geolocationPromise = geolocation.getLocation().then(function(data){
	      Location.resource.get({latlng: data.coords.latitude + ',' + data.coords.longitude}).$promise.then(function(resp) {
	      	$scope.currentLocation = resp;
      		Location.getResults(_.where($scope.currentLocation.results, {types: ['postal_code']})[0], true);
	      });
	    });
    }
  });
