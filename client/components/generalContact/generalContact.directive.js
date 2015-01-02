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
      controller: function($scope, Auth, email, $timeout) {
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
          if($scope.contactForm.$valid) {
            $scope.emailPromise = email.send({},$scope.email, function(resp){
              $scope.emailFail = false;
              $scope.emailSuccess = true;
              $timeout(function() { $scope.emailSuccess = false; }, 5000);
            }, function(err) {
              $scope.emailFail = true;
            });
          }
        }
      }
    };
  });