'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rankings', {
        templateUrl: 'app/rankings/rankings.html',
        controller: 'RankingsCtrl'
      });
  });
