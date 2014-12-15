'use strict';

angular.module('cruvitaApp')
  .controller('RankingsCtrl', function ($scope, Location, School) {
  	$scope.getLocation = Location.autocomplete;

    $scope.getRankings = function() {
    	var requestObject = Location.getRequest($scope.locationSelected, false);
    	$scope.schoolPromise = School.retrieve(requestObject, {}, function(response) {
        $scope.schools = response;
      }).$promise;
    }
  });
