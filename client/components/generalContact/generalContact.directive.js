'use strict';

angular.module('cruvitaApp')
  .directive('generalContact', function () {
    return {
      templateUrl: 'components/generalContact/generalContact.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {
      },
      controller: ['$scope', 'User', function($scope, User){
        $scope.user = User;

        $scope.emailMessage = {
          name: '',
          num: '',
          subject: 'Need to make this grab the Listing Address',
          email: '',
          user: '',
          message: ''
        }
        console.log($scope.emailMessage);
      }]
    };
  });