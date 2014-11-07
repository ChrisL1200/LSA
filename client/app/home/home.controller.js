'use strict';

angular.module('cruvitaApp')
  .controller('HomeCtrl', function ($scope, Location, $location) {
  	$scope.getLocation = Location.autocomplete;
  	$scope.getResults = function() {
  	  var geometry = _.where(Location.lastSelected, { 'formatted_address': $scope.locationSelected })[0].geometry;
  	  $location.search('NELAT', geometry.bounds.northeast.lat);
  	  $location.search('NELONG', geometry.bounds.northeast.lng);
  	  $location.search('SWLAT', geometry.bounds.southwest.lat);
  	  $location.search('SWLONG', geometry.bounds.southwest.lng);
	  	$location.path('/results');
	  }
  });
