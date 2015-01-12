'use strict';

angular.module('cruvitaApp')
  .directive('advertisement', function ($http) {
    return {
      templateUrl: 'components/advertisement/advertisement.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	$http.get('/api/advertisements').then(function(advertisements){
	        scope.advertisements = advertisements.data;
	      });
      }
    };
  });