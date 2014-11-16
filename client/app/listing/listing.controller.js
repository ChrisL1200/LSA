'use strict';

angular.module('cruvitaApp')
  .controller('ListingCtrl', function ($scope, $routeParams, $location, Homes) {

    $scope.homeId = $routeParams.homeId;
    console.log('id', $scope.listingID);

//FUNCTION IN PROGRESS
//    $scope.listingPromise = Homes.retrieve
  });
