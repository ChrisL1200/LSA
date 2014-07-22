'use strict';

angular.module('lsaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, Lsascore) {
    $scope.getLocation = function(val) {
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
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
    $scope.incomes = [{label: "Less than 200,000", value: 200000},{label: "200,000 - 300,000", value: 250000},{label: "More than 300,000", value: 300000}]
    var updateScore = function() {
      Lsascore.get({northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude }, function(response) {
        $scope.markers = response;
        _.each($scope.markers, function (marker) {

          marker.coordz = {latitude: 46, longitude: -77};
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

    var onMarkerClicked = function (marker) {
      angular.forEach($scope.markers, function(marker) {
        marker.showWindow = false;
      });
      marker.showWindow = true;
      $scope.$apply();
    };

    $scope.map = {
      center: {
        latitude: 38,
        longitude: -79.5
      },
      zoom: 6,
      draggable: true,
      bounds: {
         northeast: {
            latitude: 39.466012,
            longitude: -75.24215719999999
         },
         southwest : {
            latitude: 36.5407589,
            longitude: -83.675415
         }
      },
      polylines: [
            {
              id: 1,
              path: [
                {
                  latitude: 38.466012,
                  longitude: -76.24215719999999
                },
                {
                  latitude: 38.466012,
                  longitude: -77.24215719999999
                },
                {
                  latitude: 37.466012,
                  longitude: -77.24215719999999
                },
                {
                  latitude: 37.466012,
                  longitude: -76.24215719999999
                },
                {
                  latitude: 38.466012,
                  longitude: -76.24215719999999
                }
              ],
              stroke: {
                color: '#6060FB',
                weight: 3
              },
              editable: true,
              draggable: false,
              geodesic: false,
              visible: true,
              clickable: true
            }
          ]
    };
    var keyPromise;

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      $scope.markers = [];
      if(keyPromise)
        $timeout.cancel(keyPromise);
      keyPromise = $timeout(function() {
        updateScore();
      }, 400);
    }, true);
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