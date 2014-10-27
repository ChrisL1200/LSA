'use strict';

angular.module('lsaApp')
  .controller('mapWidgetCtrl', function ($scope, drawChannel, clearChannel) {
  	$scope.drawWidget = {
        controlText: 'draw',
        controlClick: function () {
          drawChannel.invoke();
        }
      };
      $scope.clearWidget = {
        controlText: 'clear',
        controlClick: function () {
          clearChannel.invoke();
        }
      };
  });
