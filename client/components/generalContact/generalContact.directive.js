'use strict';

angular.module('cruvitaApp')
  .directive('generalContact', function () {
    return {
      templateUrl: 'components/generalContact/generalContact.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller: ['$scope', 'User', function($scope, User){
        $scope.user = User;
        console.log($scope.user);

        $scope.emailMessage = {
          name: '',
          num: '',
          email: '',
          user: '',
          message: ''
        }
      }]
    };
  });