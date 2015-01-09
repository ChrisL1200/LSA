'use strict';

angular.module('cruvitaApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, School, Config, Homes, drawChannel, clearChannel, Location, $routeParams) {
    $scope.map = Config.mapDefaults;
    $scope.currentView = 'schools';
    $scope.getLocation = Location.autocomplete;
    $scope.homeWindow = {};
    $scope.schoolFilters = {};
    $scope.homeFilters = {
      type: {rental:false, forSale: true, type: 'type', key: 'listing.propertytype'}
    };
    $scope.showOptions = false;
    $scope.lastSelected = Location.lastSelected;
    $scope.config = Config;
    $scope.searchQuery = $routeParams.q;
    $scope.infiniteHomes = [];

    $scope.showIframe = function() {
      angular.element('.ddIframe').css('display', 'block');
    }
    $scope.hideIframe = function() {
      angular.element('.ddIframe').css('display', 'none');
    }

    var keyPromise, promise;
    var firstRequest = true;
    var noBounds = true;
    var getBounds = function(map) {
      return [
        {type:'range', key: map.latitude, min: $scope.map.bounds.southwest.latitude, max: $scope.map.bounds.northeast.latitude},
        {type:'range', key: map.longitude, min: $scope.map.bounds.southwest.longitude, max: $scope.map.bounds.northeast.longitude}
      ];
    }

    var getParams = function(map) {
      var params = [];
      _.each($routeParams, function(value, key) {
        if(key !== 'SWLAT' && key !== 'SWLONG' && key !== 'NELAT' && key !== 'NELONG' && key !== 'q') {
          params.push({type: 'equals', key: map[key], value: value});
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
      var lkeys = [];

      angular.forEach($scope.map.homes.results, function(home) {
        home.coordinates = {
          latitude: home.listing.location.latitude,
          longitude: home.listing.location.longitude
        };
        //Send Metrics to LH
        var lkey = { lkey: home.listing.listingkey[0]};
        lkeys.push(lkey);

        // home.icon = 'favicon.png';
        home.closeClick = function () {
          $scope.homeWindow = {};
        };

        home.onClicked = function ()  {
          $scope.homeWindow = home;
          $scope.homeWindow.showWindow = true;
        };
      });
      (function(l,i,s,t,h,u,b){l['ListHubAnalyticsObject']=h;l[h]=l[h]||function(){
        (l[h].q=l[h].q||[]).push(arguments)},l[h].d=1*new Date();u=i.createElement(s),
        b=i.getElementsByTagName(s)[0];u.async=1;u.src=t;b.parentNode.insertBefore(u,b)
        })(window,document,'script','//tracking.listhub.net/la.min.js','lh');

        lh('init', {provider:'M-2570', test:true});
        lh('submit', 'SEARCH_DISPLAY', lkeys);
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

        if(!$scope.selectedSchool || ($scope.selectedSchool && school._id === $scope.selectedSchool._id)) {
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

    $scope.$watchGroup(['config.advancedHomeRangeFilters.price.min','config.advancedHomeRangeFilters.price.max'], function(newValues, oldValues) {
      if(oldValues != newValues) {
        angular.extend($scope.homeFilters, {
          listprice: {min: newValues[0], max: newValues[1], type: 'range', key: 'listing.listprice'}
        });
        debounceRequest(500, function(){
          $scope.updateHomes();
        });
      }
    });

    $scope.$watchGroup(['config.advancedHomeRangeFilters.sqFt.min','config.advancedHomeRangeFilters.sqFt.max'], function(newValues, oldValues) {
      if(oldValues != newValues) {
        angular.extend($scope.homeFilters, {
          sqFt: {min: newValues[0], max: newValues[1], type: 'range', key: 'listing.livingarea'}
        });
        debounceRequest(500, function(){
          $scope.updateHomes();
        });
      }
    });

    $scope.updateSchools = function() {
      var queries = [];
      if(noBounds) {
        queries = getParams(Location.schoolsComponentMap);
      }
      else {
        queries = getBounds(Location.schoolsComponentMap);
      }
      angular.forEach($scope.schoolFilters, function(val, key) {
        if(val.value || val.type === 'type' || (val.min && val.max)) {
          queries.push(val);
        }
      });
      $scope.schoolPromise = School.retrieve({}, {polygons: getPolygons(), queries: queries}, function(response) {
        schoolCallback(response);
      }).$promise;
    }

    $scope.updateHomes = function() {
      var queries = [];
      if(noBounds) {
        queries = getParams(Location.homesComponentMap);
      }
      else {
        queries = getBounds(Location.homesComponentMap);
      }
      angular.forEach($scope.homeFilters, function(val, key) {
        if(val.value || val.type === 'type' || (val.min && val.max)) {
          queries.push(val);
        }
      });
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
      $scope.homePromise = Homes.retrieve({}, {polygons: paths.concat(getPolygons()), queries: queries}, function(response) {
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

    $scope.homeHover = function(home) {
      if(home) {
        $scope.homeWindow = home;
        $scope.homeWindow.showWindow = true;
      }
      else {
        $scope.homeWindow = {};
        $scope.homeWindow.showWindow = false;
      }
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