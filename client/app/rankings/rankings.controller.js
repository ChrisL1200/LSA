'use strict';

angular.module('cruvitaApp')
  .controller('RankingsCtrl', function ($scope, Location, School) {
  	$scope.getLocation = Location.autocomplete;

    $scope.getRankings = function() {
    	var queries = [];
    	var selected =  _.where(Location.lastSelected, { 'formatted_address': $scope.locationSelected })[0];
    	angular.forEach(selected.address_components, function(component) {
    		if(component.types[0] !== 'country' && component.types[0] !== 'administrative_area_level_2') {
    			queries.push({key: Location.schoolsComponentMap[component.types[0]], value: component.short_name, type: 'equals'});
	    	}
    	})
    	$scope.schoolPromise = School.retrieve({}, {queries: queries}, function(response) {
        $scope.schools = response;
      }).$promise;
    }
  });
