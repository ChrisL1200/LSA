'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listing', {
        templateUrl: 'app/listing/listing.html',
        controller: 'ListingCtrl'
      });
  });
