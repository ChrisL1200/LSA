'use strict';

angular.module('lsaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, Lsascore, Config, Homes, drawChannel, clearChannel) {
    $scope.map = Config.mapDefaults;
    $scope.currentView = 'schools';
    $scope.incomes = Config.incomes;

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

    //Update Score
    var updateScore = function() {
      if($scope.map.bounds.northeast) {
        var parsedPolygons = [];
        angular.forEach($scope.map.polys, function(poly) {
          var path = [];
          angular.forEach(poly.getPath().j, function(latLong) {
            path.push([latLong.lat(), latLong.lng()]);
          });
          parsedPolygons.push(path);
        });
        $scope.scorePromise = Lsascore.retrieve({northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude, 
          gradeLevel: $scope.gradeLevel }, {polygons: parsedPolygons}, function(response) {
          $scope.map.markers = response;
          $scope.map.polylines = [];
          _.each($scope.map.markers, function (marker) {
            var red = Math.round((255*(10-marker.score))/10);
            var green = Math.round((255*marker.score)/10);
            if(red < 16) {
              red += 16;
            }
            if(green < 16) {
              green += 16;
            }
            marker.lsaColor = "#" + red.toString(16) + green.toString(16) + "00";
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
            newPolyline.path = marker.wkt;
            newPolyline.boundaryClick = function() {
              console.log("hi");
            };

            $scope.map.polylines.push(newPolyline);
          });
        }).$promise;
      }
    } 

    var keyPromise;

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      if(newVal !== oldVal && $scope.currentView === 'schools') {
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

    //When user views homes
    $scope.setHomes = function(school) {
      $scope.currentView = 'homes';
      $scope.map.bounds = {
        northeast: {
          latitude: _.max(school.wkt, 'latitude').latitude,
          longitude: _.max(school.wkt, 'longitude').longitude
        },
        southwest: {
          latitude: _.min(school.wkt, 'latitude').latitude,
          longitude: _.min(school.wkt, 'longitude').longitude
        }
      };
      var requestBounds = {northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude};
      var newPolyline = angular.copy(Config.defaultPolyline);
      newPolyline.path = school.wkt;
      $scope.map.polylines = [newPolyline];
      $scope.homePromise = Homes.retrieve(requestBounds, {polygons: [school.wkt]}, function(homes) {
        $scope.map.markers = homes;
      }).$promise;
    };

    $scope.setSchools = function() {
      $scope.currentView = 'schools';
      updateScore();
    };

    $scope.clearPolygons = function() {
      $scope.map.polys = [];
      updateScore();  
    };

    $scope.applyPolygons = function() {
      updateScore();          
    };

    var draw = function() {
      $scope.map.draw(); //should be defined by now
    };
    //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
    drawChannel.add(draw);

    //Initial Load
    updateScore();
  });