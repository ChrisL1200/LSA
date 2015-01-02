'use strict';

angular.module('cruvitaApp')
  .directive('login', function ($modal) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	element.on('click', function () {
      		scope.open();
			  });
      },
      controller: function($scope, $modal) {
      	$scope.open = function() {
	      	$modal.open({
						backdrop: true,
			      templateUrl: 'components/login/login.html',
			      controller: function($scope, $modalInstance, Auth, $location) {
			      	$scope.user = {};
					    $scope.errors = {};

					    $scope.login = function(form) {
					      $scope.submitted = true;

					      if(form.$valid) {
					        Auth.login({
					          email: $scope.user.email,
					          password: $scope.user.password
					        })
					        .then( function() {
						    		$modalInstance.close();
					        })
					        .catch( function(err) {
					          $scope.errors.other = err.message;
					        });
					      }
					    };

					    $scope.loginOauth = function(provider) {
					      $window.location.href = '/auth/' + provider;
					    };
			      	$scope.ok = function () {
						    $modalInstance.close();
						  };

						  $scope.cancel = function () {
						    $modalInstance.dismiss('cancel');
						  };

						  $scope.register = function() {
						  	$location.path('/signup');
						    $modalInstance.dismiss('cancel');
						  }
			      }
			    });
	      }
      }
    };
  });