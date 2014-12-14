'use strict';

angular.module('cruvitaApp')
  .controller('RankingsCtrl', function ($scope, Location, School) {
  	$scope.getLocation = Location.autocomplete;
    $scope.getRankings = function() {
    	var geometry = _.where(Location.lastSelected, { 'formatted_address': $scope.locationSelected })[0].geometry;
    	$scope.schoolPromise = School.retrieve({northeastLat: geometry.bounds.northeast.lat, northeastLong: geometry.bounds.northeast.lng, southwestLat: geometry.bounds.southwest.lat, southwestLong: geometry.bounds.southwest.lng}, {}, function(response) {
        $scope.schools = response;
      }).$promise;
    }
  });
