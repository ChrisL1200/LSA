'use strict';

angular.module('cruvitaApp')
  .controller('SchoolCtrl', function ($scope, School, $routeParams) {
    School.get({id: $routeParams.id}, function(school) {
    	$scope.school = school;
    })
  });
