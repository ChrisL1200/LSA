'use strict';

angular.module('cruvitaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, School, Config, Homes, drawChannel, clearChannel, Location, $routeParams) {
    $scope.map = Config.mapDefaults;
    $scope.currentView = 'schools';
    $scope.getLocation = Location.autocomplete;
    $scope.homeWindow = {};
    $scope.schoolFilters = {};
    $scope.homeFilters = {};
    $scope.showOptions = false;
    $scope.lastSelected = Location.lastSelected;
    $scope.config = Config;

    console.log(Location);

    $scope.$watch( '$scope.homeFilters',
      function() {
        console.log($scope.homeFilters);
      });

    var getBounds = function() {
      return {northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude};
    }

    var updateScore = function() {
      if($scope.map.bounds.northeast) {
        $scope.updateHomes();
        $scope.updateSchools();
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

    var pluckValues = function(input) {
      var output = {};
      angular.forEach(input, function(value, key) {
        output[key] = value.value || 0;
      });
      return output;
    }

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      if(newVal !== oldVal && !$scope.selectedSchool) {
          if(keyPromise)
            $timeout.cancel(keyPromise);
          keyPromise = $timeout(function() {
            $scope.selectedSchool = undefined;
            updateScore();
          }, 500);
      }
    }, true);

    $scope.updateSchools = function() {
      var request = getBounds();
      request = _.merge(request, pluckValues($scope.schoolFilters));
      $scope.schoolPromise = School.retrieve(request, {polygons: getPolygons()}, function(response) {
        schoolCallback(response);
      }).$promise;
    }

    $scope.updateHomes = function() {
      var request = getBounds();
      request = _.merge(request, pluckValues($scope.homeFilters));
      var paths = [];
      angular.forEach($scope.map.polylines, function(polyline) {
        if($scope.selectedSchool && polyline.id === $scope.selectedSchool._id) {
          polyline.selected = true;
        }
      });
      if($scope.selectedSchool) {
        var path = [];
        angular.forEach($scope.selectedSchool.wkt, function(coordinate) {
          path.push([coordinate.latitude, coordinate.longitude]);
        });
        paths.push(path);
      }
      $scope.homePromise = Homes.retrieve(request, {polygons: paths}, function(homes) {
        homesCallback(homes);
      }).$promise;
    }
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
      $scope.map.schools = [school];
      $scope.updateHomes();
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