'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/results', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      });
  });