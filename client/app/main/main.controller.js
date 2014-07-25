'use strict';

angular.module('lsaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, Lsascore, Config) {
    $scope.map = Config.mapDefaults;

    //Autocomplete service
    $scope.getLocation = function(val) {
      return $http.get(Config.autocompleteService, {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        $scope.lastSelected = res.data.results;
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };

    //Filters
    $scope.incomes = [{label: "Less than 200,000", value: 200000},{label: "200,000 - 300,000", value: 250000},{label: "More than 300,000", value: 300000}]
    
    //Bound change callback
    var updateScore = function() {
      Lsascore.get({northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude }, function(response) {
        $scope.markers = response;
        _.each($scope.markers, function (marker) {
          marker.closeClick = function () {
            marker.showWindow = false;
            $scope.$apply();
          };
          marker.onClicked = function ()  {
            onMarkerClicked(marker);
          };
        });
      });
    } 

    var keyPromise;

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      $scope.markers = [];
      if(keyPromise)
        $timeout.cancel(keyPromise);
      keyPromise = $timeout(function() {
        updateScore();
      }, 400);
    }, true);

    //Marker Click Callback
    var onMarkerClicked = function (marker) {
      angular.forEach($scope.markers, function(marker) {
        marker.showWindow = false;
      });
      marker.showWindow = true;
      $scope.$apply();
    };

    //Update bounds when input is entered 
    $scope.updateBounds = function() {
      var geometry = _.where($scope.lastSelected, { 'formatted_address': $scope.locationSelected })[0].geometry;
      $scope.map.bounds = {
        northeast: {
          latitude: geometry.bounds.northeast.lat,
          longitude: geometry.bounds.northeast.lng
        },
        southwest: {
          latitude: geometry.bounds.southwest.lat,
          longitude: geometry.bounds.southwest.lng
        }
      };
    };
  });