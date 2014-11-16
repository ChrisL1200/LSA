'use strict';

angular.module('cruvitaApp')
  .directive('agents', function () {
    return {
      templateUrl: 'app/agents/agents.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });