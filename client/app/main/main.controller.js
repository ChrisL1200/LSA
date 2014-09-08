'use strict';

angular.module('lsaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, Lsascore, Config, Homes) {
    $scope.map = Config.mapDefaults;
    $scope.currentView = 'schools';

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
    $scope.incomes = Config.incomes;

    //Update Score
    var updateScore = function() {
      if($scope.map.bounds.northeast) {
        $scope.scorePromise = Lsascore.query({northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude, gradeLevel: $scope.gradeLevel }, function(response) {
          $scope.map.markers = response;
          _.each($scope.map.markers, function (marker) {
            //Delete
            marker.coordinates = {
              latitude: marker.wkt[0].latitude,
              longitude: marker.wkt[0].longitude
            };
            //Initialize markers
            marker.showWindow = false;
            marker.closeClick = function () {
              marker.showWindow = false;
              $scope.$apply();
            };
            marker.onClicked = function ()  {
              onMarkerClicked(marker);
            };

            //Initialize polylines
            var newPolyline = angular.copy(Config.defaultPolyline);
            angular.forEach(marker.wkt, function(latLong) {
              delete latLong['_id'];
            });
            newPolyline.path = marker.wkt;
            newPolyline.boundaryClick = function() {
              alert("WOOT");
            };
            // $scope.map.polylines.push(newPolyline);
          });
        }).$promise;
      }
    } 

    var keyPromise;

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      if(newVal !== oldVal) {
          if(keyPromise)
            $timeout.cancel(keyPromise);
          keyPromise = $timeout(function() {
            updateScore();
          }, 250);
      }
    }, true);

    $scope.$watch('gradeLevel', function(newVal, oldVal) {
      if(newVal !== oldVal) {
        updateScore();
      }
    });
    
    //Marker Click Callback
    var onMarkerClicked = function (marker) {
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

    $scope.setHomes = function(school) {
      $scope.currentView = 'homes';
      $scope.homePromise = Homes.retrieve({}, {boundary: school.wkt}, function(homes) {
        $scope.map.markers = homes;
      }).$promise;
    };

    $scope.setSchools = function() {
      $scope.currentView = 'schools';
      updateScore();
    }
    //Initial Load
    updateScore();
  });