'use strict';

angular.module('cruvitaApp')
  .directive('schools', function () {
    return {
      templateUrl: 'components/schools/schools.html',
      restrict: 'EA',
      scope: {
      	schools: '=',
        map: '@',
        selectSchool: '&',
        unselectSchool: '&'
      },
      link: function (scope, element, attrs) {
        scope.activateSchool = function(school) {
          scope.selectSchool({school: school});
          scope.selected = true;
        }

        scope.deactivateSchool = function(school) {
          scope.unselectSchool({school: school});
          scope.selected = false;
        }
      }
    };
  });