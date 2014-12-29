'use strict';

angular.module('cruvitaApp')
  .controller('ListingCtrl', function ($scope, $routeParams, $location, Homes) {
    $scope.homeId = $routeParams.homeId;


		$scope.listingPromise = Homes.get({homeId: $scope.homeId}, function(listing) {
			$scope.listing = listing.home.listing;
			$scope.agents = listing.agent;
		})
  });
