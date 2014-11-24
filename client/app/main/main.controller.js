'use strict';

angular.module('cruvitaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, School, Config, Homes, drawChannel, clearChannel, Location, $routeParams) {
    $scope.map = Config.mapDefaults;
    $scope.currentView = 'schools';
    $scope.incomes = Config.incomes;
    $scope.getLocation = Location.autocomplete;
    $scope.homeWindow = {};

    var updateScore = function() {
      if($scope.map.bounds.northeast) {
        var parsedPolygons = getPolygons();
        var requestBounds = {northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude};

        $scope.homePromise = Homes.retrieve(requestBounds, {polygons: parsedPolygons}, function(homes) {
          homesCallback(homes)
        }).$promise;

        requestBounds.gradeLevel = $scope.gradeLevel;

        $scope.schoolPromise = School.retrieve(requestBounds, {polygons: parsedPolygons}, function(response) {
          schoolCallback(response);
        }).$promise;
      }
    }

    var getPolygons = function() {
      var parsedPolygons = [];
      angular.forEach($scope.map.polys, function(poly) {
        var path = [];
        angular.forEach(poly.getPath().j, function(latLong) {
          path.push([latLong.lat(), latLong.lng()]);
        });
        parsedPolygons.push(path);
      });

      return parsedPolygons;
    }

    var homesCallback = function(homes) {
      $scope.map.homes = homes;
      angular.forEach($scope.map.homes, function(home) {
        home.coordinates = {
          latitude: home.listing.location[0].latitude[0],
          longitude: home.listing.location[0].longitude[0]
        };
        // home.icon = 'assets/images/yeoman.png';
        home.closeClick = function () {
          $scope.homeWindow = {};
        };
        home.onClicked = function ()  {
          $scope.homeWindow = home;
          $scope.homeWindow.showWindow = true;
        };
      });
    }

    var schoolCallback = function(schools) {
      $scope.map.schools = schools;
      $scope.map.polylines = [];
      _.each($scope.map.schools, function (school) {
        var red = Math.round((255*(10-school.score))/10);
        var green = Math.round((255*school.score)/10);
        if(red < 16) {
          red += 16;
        }
        if(green < 16) {
          green += 16;
        }
        school.lsaColor = "#" + red.toString(16) + green.toString(16) + "00";
        school.closeClick = function () {
          $scope.schoolWindow = {};
        };
        school.onClicked = function ()  {
          $scope.schoolWindow = school;
          $scope.schoolWindow.showWindow = true;
        };

        var newPolyline = angular.copy(Config.defaultPolyline);
        newPolyline.path = school.wkt;
        newPolyline.id = school._id;

        if($scope.selectedSchool && school._id === $scope.selectedSchool._id) {
          newPolyline.selected = true; 
        }
        $scope.map.polylines.push(newPolyline);
      });
    }
    var keyPromise;

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      if(newVal !== oldVal && !$scope.selectedSchool) {
          if(keyPromise)
            $timeout.cancel(keyPromise);
          keyPromise = $timeout(function() {
            updateScore();
          }, 500);
      }
    }, true);

    //Update bounds when input is entered
    $scope.updateBounds = function() {
      var geometry = _.where(Location.lastSelected, { 'formatted_address': $scope.locationSelected })[0].geometry;
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

    $scope.setSchool = function(school) {
      $scope.selectedSchool = school;
      $scope.map.center = school.coordinates;
      var path = [];
      angular.forEach($scope.map.polylines, function(polyline) {
        if(polyline.id === school._id) {
          polyline.selected = true;
        }
      });
      angular.forEach(school.wkt, function(coordinate) {
        path.push([coordinate.latitude, coordinate.longitude]);
      });
      $scope.map.schools = [school];
      var requestBounds = {northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude};
      $scope.homePromise = Homes.retrieve(requestBounds, {polygons: [path]}, function(homes) {
        homesCallback(homes);
      }).$promise;
    };

    $scope.clearPolygons = function() {
      $scope.map.polys = [];
      updateScore();
    };

    $scope.applyPolygons = function() {
      updateScore();
    };

    $scope.unselectSchool = function() {
      $scope.selectedSchool = undefined;
      updateScore();
    };
    var draw = function() {
      $scope.map.draw(); //should be defined by now
    };
    //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
    drawChannel.add(draw);

    if($routeParams.NELONG) {
      $scope.map.center = {
          latitude: (parseFloat($routeParams.NELAT) + parseFloat($routeParams.SWLAT))/2,
          longitude: (parseFloat($routeParams.NELONG) + parseFloat($routeParams.SWLONG))/2
      }
    }

    //Initial Load
    updateScore();
  });