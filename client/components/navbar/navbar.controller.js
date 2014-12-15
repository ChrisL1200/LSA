'use strict';

angular.module('cruvitaApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Location) {
     $scope.menu = [{
       'title': 'Rankings',
      'link': '/rankings'
    },{
       'title': 'News/Blog',
      'link': '/news'
    },{
       'title': 'About',
      'link': '/about'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.getLocation = Location.autocomplete;
    $scope.updateBounds = function() {
      Location.getResults($scope.locationSelected);
    }
  });