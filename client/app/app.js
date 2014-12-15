'use strict';

angular.module('cruvitaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute',
  'google-maps'.ns(),
  'ui-rangeSlider',
  'cgBusy'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $templateCache, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute){
      $location.search('scrollTo', null);
      $anchorScroll();
    })
    $rootScope.updateRoute = function(route) {
      $location.path(route);
    };
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
    $templateCache.put('draw.tpl.html', '<button class="btn btn-primary" ng-click="drawWidget.controlClick()"><i class="fa fa-pencil"></i></button>');
  })
  .filter('capitalize', function() {
    return function(input, scope) {
      if (input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
      }
    }
  })
  .filter('titleCase', function(){
    return function(input, scope) {
      if (input) {
        return input.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }
    }
  }).filter('boolean', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});
