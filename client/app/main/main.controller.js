'use strict';

angular.module('cruvitaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, School, Config, Homes, drawChannel, clearChannel, Location, $routeParams) {
    $scope.map = Config.mapDefaults;
    $scope.currentView = 'schools';
    $scope.getLocation = Location.autocomplete;
    $scope.homeWindow = {};
    $scope.schoolFilters = {};
    $scope.homeFilters = {
      forSale: {value:true},
      rental: {value:false}
    };
    $scope.showOptions = false;
    $scope.lastSelected = Location.lastSelected;
    $scope.config = Config;
    $scope.searchQuery = $routeParams.q;
    $scope.infiniteHomes = [];

    var keyPromise, promise;
    var firstRequest = true;
    var noBounds = true;
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
      $scope.infiniteHomes = [];
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
        if(value) {
          output[key] = value.value;
        }
      });
      return output;
    }

    var boundUpdate = function() {
      if(keyPromise)
        $timeout.cancel(keyPromise);
      keyPromise = $timeout(function() {
        $scope.selectedSchool = undefined;
        updateScore(noBounds);
      }, 500);
    }

    var debounceRequest = function(duration, callback) {
      if(promise)
        $timeout.cancel(promise);
      promise = $timeout(function() {
        callback();
      }, 500);
    }

    $scope.$watch('map.bounds', function(newVal, oldVal) {
      if((!oldVal.northeast || Location.searching) && newVal !== oldVal) {
        Location.searching = false;
        boundUpdate();
      }
      else if(newVal !== oldVal && !$scope.selectedSchool) {
        noBounds = false;
        boundUpdate();
      }
    }, true);

    $scope.$watchGroup(['config.advancedHomeRangeFilters.price.min','config.advancedHomeRangeFilters.price.max','config.advancedHomeRangeFilters.sqFt.min','config.advancedHomeRangeFilters.sqFt.max'], function(newValues, oldValues) {
      if(oldValues != newValues) {
        angular.extend($scope.homeFilters, {
          priceMin: {value: newValues[0]},
          priceMax: {value: newValues[1]},
          sqFtMin: {value: newValues[2]},
          sqFtMax: {value: newValues[3]}
        });
        debounceRequest(500, function(){
          $scope.updateHomes(true);
        });
      }
    });

    $scope.updateSchools = function() {
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

    $scope.updateHomes = function() {
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
        if($scope.infiniteHomes.length >= $scope.map.homes.results.length - number) {
          number = $scope.map.homes.results.length - $scope.infiniteHomes.length;
        }
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

    //Initial Load
    updateScore(true);
  });