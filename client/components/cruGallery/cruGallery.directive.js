'use strict';

angular.module('cruvitaApp')
  .directive('cruGallery', function () {
    return {
      templateUrl: 'components/cruGallery/cruGallery.html',
      restrict: 'EA',
      replace: true,
      controller: ['$scope', function ($scope) {
        $scope.selected = 0;

        $scope.advanceLeft = function(index, first) {
          if (!first){
            $scope.selected = (index - 1);
          }
        }

        $scope.advanceRight = function(index, last) {
          if (!last) {
            $scope.selected = (index + 1);
          }
        }

        $scope.selectImage = function(ind) {
          $scope.selected = ind;
        };

        $scope.isSelected = function(index){
          if (index === $scope.selected) {
            return true;
          }
        }
      }]
    };
  });