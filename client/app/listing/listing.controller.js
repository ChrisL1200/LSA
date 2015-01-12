'use strict';

angular.module('cruvitaApp')
  .controller('ListingCtrl', function ($scope, $routeParams, $location, Homes) {
    $scope.homeId = $routeParams.homeId;

		$scope.listingPromise = Homes.get({homeId: $scope.homeId}, function(listing) {
			$scope.listing = listing.home.listing;
      //make it easier to call the listing agent
      $scope.lagent = $scope.listing.listingparticipants.participant;
			$scope.agent = listing.agent[0];

      console.log(listing, $scope.agent);
      //Send Metrics to LH
      $scope.lkey = $scope.listing.listingkey[0];

      //LH View Tracking
      lh('submit', 'DETAIL_PAGE_VIEWED', {lkey:$scope.lkey});
		})

    //LH Clicktracking
    $scope.lagentClick = function(){
      lh('submit', 'AGENT_EMAIL_CLICKED', {lkey:$scope.lkey});
    }
  });
