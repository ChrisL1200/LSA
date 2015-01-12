'use strict';

angular.module('cruvitaApp')
  .directive('showAgent', function () {
    return {
      templateUrl: 'app/agents/agents.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {
      }
    };
  });