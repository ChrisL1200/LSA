'use strict';

angular.module('cruvitaApp')
  .controller('IndexCtrl', function ($scope, $location) {
    $scope.$on('$viewContentLoaded', function (){
      $scope.location = $location.path();
    });
  });
