'use strict';

angular.module('lsaApp')
  .controller('MainCtrl', function ($scope, $http, Lsascore) {
    $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
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
    
    Lsascore.get({}, function(response) {
      $scope.markers = response;
    }); 

    $scope.map = {
      center: {
        latitude: 38,
        longitude: -79.5
      },
      zoom: 6
    };
    // $scope.markers = [{
    //   coordinates: {
    //     latitude: 38,
    //     longitude: -79.5
    //   },
    //   schoolDistrict: "Fairfax County",
    //   scores: {
    //     test: 9.3,
    //     realEstate: 5.5,
    //     crime: 3.7,
    //     total: 5.9
    //   }
    // },{
    //   coordinates: {
    //     latitude: 38,
    //     longitude: -79.9
    //   },
    //   schoolDistrict: "Prince William County",
    //   scores: {
    //     test: 9.3,
    //     realEstate: 5.5,
    //     crime: 3.7,
    //     total: 5.5
    //   }
    // },{
    //   coordinates: {
    //     latitude: 38,
    //     longitude: -79.1
    //   },
    //   schoolDistrict: "Loudon County",
    //   scores: {
    //     test: 9.3,
    //     realEstate: 5.5,
    //     crime: 3.7,
    //     total: 5.3
    //   }
    // },{
    //   coordinates: {
    //     latitude: 38.3,
    //     longitude: -79.5
    //   },
    //   schoolDistrict: "Spotsylvania County",
    //   scores: {
    //     test: 9.3,
    //     realEstate: 5.5,
    //     crime: 3.7,
    //     total: 5.1
    //   }
    // }];
    $scope.updateBounds = function() {
      var geometry = _.where($scope.lastSelected, { 'formatted_address': $scope.locationSelected })[0].geometry;
      // $scope.map.center.latitude = geometry.location.lat;
      // $scope.map.center.latitude = geometry.location.long;
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
      var z = 13;
    };
  });