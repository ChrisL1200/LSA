'use strict';

angular.module('cruvitaApp')
  .directive('schools', function () {
    return {
      templateUrl: 'components/schools/schools.html',
      restrict: 'EA',
      scope: {
      	schools: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });