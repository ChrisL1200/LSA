'use strict';

angular.module('cruvitaApp')
  .directive('homeScroll', function () {
    return {
      restrict: 'EA',
      scope: false,
      link: function (scope, element, attrs) {
      	element.scrollTop();
      	element.bind('scroll', function(){
				  if($(this).scrollTop() + $(this).innerHeight() >= ($(this)[0].scrollHeight - 80)) {
      			scope.loadMoreHomes(5);
				  }
				});
      }
    };
  });