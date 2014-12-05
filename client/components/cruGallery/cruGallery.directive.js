'use strict';

angular.module('cruvitaApp')
  .directive('cruGallery', function () {
    return {
      templateUrl: 'components/cruGallery/cruGallery.html',
      restrict: 'EA',
      replace: true,
      controller: ['$scope', function ($scope) {

        // Scroll to appropriate position based on image index and width
        $scope.scrollTo = function(image, ind) {
            $scope.listposition = {visibility: visible};
            $scope.selected = image;
        };
      }]
    };
  });