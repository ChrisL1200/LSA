'use strict';

angular.module('cruvitaApp')
  .directive('generalContact', function () {
    return {
      templateUrl: 'components/generalContact/generalContact.html',
      restrict: 'EA',
      replace: true,
      scope: {
        subject: '=',
        to: '=',
        message: '='
      },
      controller: function($scope, Auth, email) {
        var user = Auth.getCurrentUser();
        $scope.email = {
          name: user.name || '',
          num: user.phone || '',
          subject: $scope.subject || '',
          from: user.email || '',
          body: $scope.message || '',
          to: $scope.to || 'clloyd1212@gmail.com'
        }

        $scope.submit = function() {
          email.send({},$scope.email, function(resp){
            console.log(resp);
          })
        }
      }
    };
  });