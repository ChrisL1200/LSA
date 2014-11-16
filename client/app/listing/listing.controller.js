'use strict';

angular.module('cruvitaApp')
  .controller('ListingCtrl', function ($scope, $routeParams, $location, Homes) {

    $scope.homeId = $routeParams.homeId;
    console.log('id', $scope.listingID);

		$scope.listingPromise = Homes.get({homeId: $scope.homeId}, function(listing) {
			$scope.listing = listing;
		})
  });
