'use strict';

angular.module('cruvitaApp')
  .controller('ListingCtrl', function ($scope, $routeParams, $location, Homes) {
    $scope.homeId = $routeParams.homeId;
    console.log('id', $scope.homeId);


		$scope.listingPromise = Homes.get({homeId: $scope.homeId}, function(listing) {
			$scope.listing = listing.listing;
      console.log('listing', $scope.listing);
		})
  });
