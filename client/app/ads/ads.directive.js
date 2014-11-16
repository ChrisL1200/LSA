'use strict';

angular.module('cruvitaApp')
  .directive('ads', function () {
    return {
      templateUrl: 'app/ads/ads.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });