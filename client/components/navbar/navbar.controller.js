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
      var geometry = _.where(Location.lastSelected, { 'formatted_address': $scope.locationSelected })[0].geometry;
      $location.search('NELAT', geometry.bounds.northeast.lat);
      $location.search('NELONG', geometry.bounds.northeast.lng);
      $location.search('SWLAT', geometry.bounds.southwest.lat);
      $location.search('SWLONG', geometry.bounds.southwest.lng);
      $location.path('/results');
    }
  });