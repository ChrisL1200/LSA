'use strict';

angular.module('lsaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/school/:id', {
        templateUrl: 'app/school/school.html',
        controller: 'SchoolCtrl'
      });
  });
