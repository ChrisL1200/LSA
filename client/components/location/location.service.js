'use strict';

angular.module('cruvitaApp')
  .service('Location', function ($http, Config, $location) {
  	var schoolsComponentMap = {
  		locality: 'address.city',
  		administrative_area_level_1: 'address.state',
  		administrative_area_level_2: 'address.county',
  		postal_code: 'address.zip',
  		country: 'address.country'
  	};

  	var homesComponentMap = {
  		locality: 'listing.address.city',
  		administrative_area_level_1: 'listing.address.stateorprovince',
  		administrative_area_level_2: 'listing.address.county',
  		postal_code: 'listing.address.postalcode',
  		country: 'listing.address.country'
  	};

    var service = {
    	autocomplete: function(val) {
	      return $http.get(Config.autocompleteService, {
	        params: {
	          address: val,
	          sensor: false
	        }
	      }).then(function(res){
	        var addresses = [];
	        service.lastSelected = res.data.results;
	        angular.forEach(res.data.results, function(item){
	          addresses.push(item.formatted_address);
	        });
	        return addresses;
	      });
	    },
	    lastSelected: {},
	    getRequest: function(input, bounds, homes) {
	    	var selected =  _.where(service.lastSelected, { 'formatted_address': input })[0];
	    	// var map = homes ? homesComponentMap : schoolsComponentMap;
	    	var requestObject = {};
	    	_.each(selected.address_components, function(component) {
	    		if(component.types[0] !== 'country' && component.types[0] !== 'administrative_area_level_2') {
		    		requestObject[component.types[0]] = component.short_name;
		    	}
	    	});
	    	if(bounds) {
		    	requestObject.geometry = selected.geometry;
		    }
	    	return requestObject;
	    },
	    getResults: function(input) {
	    	var requestObject = service.getRequest(input, true);
	  	  $location.search('NELAT', requestObject.geometry.bounds.northeast.lat);
	  	  $location.search('NELONG', requestObject.geometry.bounds.northeast.lng);
	  	  $location.search('SWLAT', requestObject.geometry.bounds.southwest.lat);
	  	  $location.search('SWLONG', requestObject.geometry.bounds.southwest.lng);
	      _.each(requestObject, function(value, key) {
	        if(key !== 'geometry') {
	          $location.search(key, value);
	        }
	      })
		  	$location.path('/results');
		  }
    }

    return service;
  });
