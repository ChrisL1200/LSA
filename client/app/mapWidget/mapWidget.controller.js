'use strict';

angular.module('lsaApp')
  .controller('mapWidgetCtrl', function ($scope, drawChannel, clearChannel) {
  	$scope.drawWidget = {
        controlClick: function () {
          drawChannel.invoke();
        }
      };
      $scope.clearWidget = {
        controlClick: function () {
          clearChannel.invoke();
        }
      };
  });
