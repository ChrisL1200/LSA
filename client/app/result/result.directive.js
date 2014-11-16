'use strict';

angular.module('cruvitaApp')
  .directive('result', function () {
    return {
      templateUrl: 'app/result/result.html',
      restrict: 'EA',
      scope: {
        'home': '='
      },
      controller: ['$scope', '$location', function ($scope, $location) {
        $scope.goToListing = function (path) {
          $location.url('/listing/' + path);
        }
      }]
    };
  });