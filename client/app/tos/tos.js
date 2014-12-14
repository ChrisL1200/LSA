'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tos', {
        templateUrl: 'app/tos/tos.html',
        controller: 'TosCtrl'
      });
  });
