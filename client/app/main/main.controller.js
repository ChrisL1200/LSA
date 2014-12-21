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
    $scope.searchQuery = $routeParams.q;
    $scope.infiniteHomes = [];

    var keyPromise, firstRequest;

    var getBounds = function() {
      return {northeastLat: $scope.map.bounds.northeast.latitude, northeastLong: $scope.map.bounds.northeast.longitude, southwestLat: $scope.map.bounds.southwest.latitude, southwestLong: $scope.map.bounds.southwest.longitude};
    }

    var getParams = function(homes) {
      var params = {};
      _.each($routeParams, function(value, key) {
        if(key !== 'SWLAT' && key !== 'SWLONG' && key !== 'NELAT' && key !== 'NELONG' && key !== 'q') {
          params[key] = value;
        }
      });
      return params;
    }

    var updateScore = function(noBounds) {
      if($scope.map.bounds.northeast) {
        $scope.updateHomes(noBounds);
        $scope.updateSchools(noBounds);
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
      $scope.loadMoreHomes(20);
      angular.forEach($scope.map.homes.results, function(home) {
        home.coordinates = {
          latitude: home.listing.location[0].latitude[0],
          longitude: home.listing.location[0].longitude[0]
        };
        // home.icon = 'favicon.png';
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
        // var red = Math.round((255*(10-school.score))/10);
        // var green = Math.round((255*school.score)/10);
        // if(red < 16) {
        //   red += 16;
        // }
        // if(green < 16) {
        //   green += 16;
        // }
        // school.lsaColor = "#" + red.toString(16) + green.toString(16) + "00";

        school.icon = 'favicon.png';
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

    var pluckValues = function(input) {
      var output = {};
      angular.forEach(input, function(value, key) {
        output[key] = value.value || 0;
      });
      return output;
    }

    var boundUpdate = function(noBounds) {
      if(keyPromise)
        $timeout.cancel(keyPromise);
      keyPromise = $timeout(function() {
        $scope.selectedSchool = undefined;
        updateScore(noBounds);
      }, 500);
    }

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      if(!oldVal.northeast && newVal !== oldVal) {
        firstRequest = true;
        boundUpdate(true);
      }
      else if(newVal !== oldVal && !$scope.selectedSchool && !firstRequest) {
        boundUpdate(false);
      }
      else if(firstRequest) {
        firstRequest = false;
      }
    }, true);


    $scope.updateSchools = function(noBounds) {
      var request = {};
      if(noBounds) {
        request = getParams(false);
      }
      else {
        request = getBounds();
      }
      request = _.merge(request, pluckValues($scope.schoolFilters));
      $scope.schoolPromise = School.retrieve(request, {polygons: getPolygons()}, function(response) {
        schoolCallback(response);
      }).$promise;
    }

    $scope.updateHomes = function(noBounds) {
      var request = {};
      if(noBounds) {
        request = getParams(true);
      }
      else {
        request = getBounds();
      }
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
      $scope.homePromise = Homes.retrieve(request, {polygons: paths}, function(response) {
        homesCallback(response.homes);
        $scope.agents = response.agents;
      }).$promise;
    }

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

    $scope.loadMoreHomes = function(number) {
      if($scope.map.homes && $scope.infiniteHomes.length <= $scope.map.homes.results.length) {
        for(var i = 1; i <= number; i++) {
          $scope.infiniteHomes.push($scope.map.homes.results[$scope.infiniteHomes.length]);
        }
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      }
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

    drawChannel.add(draw);

    if($routeParams.NELONG) {
      $scope.map.center = {
          latitude: (parseFloat($routeParams.NELAT) + parseFloat($routeParams.SWLAT))/2,
          longitude: (parseFloat($routeParams.NELONG) + parseFloat($routeParams.SWLONG))/2
      }
    }

    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };

    //Initial Load
    updateScore(true);
  });