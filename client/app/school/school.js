'use strict';

angular.module('cruvitaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/school/:id', {
        templateUrl: 'app/school/school.html',
        controller: 'SchoolCtrl'
      });
  });
