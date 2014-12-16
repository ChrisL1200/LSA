'use strict';

angular.module('cruvitaApp')
  .directive('agents', function () {
    return {
      templateUrl: 'app/agents/agents.html',
      restrict: 'EA',
      scope: {
        listing: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: ['$scope', 'User', function($scope, User){

        $http.get('/api/users').success(function(users) {
          console.log('user', users[0]);
          $scope.users = users;
        });
        console.log('listing', $scope.listing);
        $scope.activeAgent = _.find($scope.users, function(u){
          return u.paidInterests.schools === listing
        })

      }]
    };
  });