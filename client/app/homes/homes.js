'use strict';

angular.module('lsaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/homes', {
        templateUrl: 'app/homes/homes.html',
        controller: 'HomesCtrl'
      });
  });
