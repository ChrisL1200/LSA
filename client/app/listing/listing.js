'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listing/:homeId', {
        templateUrl: 'app/listing/listing.html',
        controller: 'ListingCtrl'
      });
  });
