'use strict';

angular.module('cruvitaApp')
  .controller('FooterCtrl', function ($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    }
  });
