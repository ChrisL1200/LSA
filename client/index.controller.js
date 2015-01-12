'use strict';

angular.module('cruvitaApp')
  .controller('IndexCtrl', function ($scope, $location) {
    $scope.$on('$viewContentLoaded', function (){
      $scope.navclass = false;
      $scope.location = $location.path();
      $scope.location = $scope.location.split("/");

      ga('send', 'pageview');


      if ($scope.location[1] === 'results' || $scope.location[1] ==='listing') {
        $scope.navclass = true;
      } else {
        $scope.navclass = false;
      }
    });
  });
