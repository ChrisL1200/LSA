'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/pp', {
        templateUrl: 'app/pp/pp.html',
        controller: 'PpCtrl'
      });
  });
