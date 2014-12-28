'use strict';

angular.module('cruvitaApp')
  .controller('ListingCtrl', function ($scope, $routeParams, $location, Homes) {
    $scope.homeId = $routeParams.homeId;

		$scope.listingPromise = Homes.get({homeId: $scope.homeId}, function(listing) {
			$scope.listing = listing.listing;

      //Send Metrics to LH
      var lkey = $scope.listing.listingkey[0];
        (function(l,i,s,t,h,u,b){l['ListHubAnalyticsObject']=h;l[h]=l[h]||function(){
        (l[h].q=l[h].q||[]).push(arguments)},l[h].d=1*new Date();u=i.createElement(s),
        b=i.getElementsByTagName(s)[0];u.async=1;u.src=t;b.parentNode.insertBefore(u,b)
        })(window,document,'script','//tracking.listhub.net/la.min.js','lh');

        lh('init', {provider:'M-2570', test:true});
        lh('submit', 'DETAIL_PAGE_VIEWED', {lkey:lkey});
		})
  });
