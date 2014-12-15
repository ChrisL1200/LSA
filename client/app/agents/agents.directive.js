'use strict';

angular.module('cruvitaApp')
  .directive('agents', function () {
    return {
      templateUrl: 'app/agents/agents.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller: ['$scope', 'User', function($scope, User){
        $http.get('/api/users').success(function(users) {
          console.log(users[0]);
          $scope.users = users;
        });
      }]
    };
  });