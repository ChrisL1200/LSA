'use strict';

angular.module('cruvitaApp')
  .service('Location', function ($http, Config, $location, $route, $resource) {
  	var service = {
    	autocomplete: function(val) {
	      return $http.get('/api/geocodes', {
	        params: {
	          address: val
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
	    resource: $resource('/api/geocodes'),
	    lastSelected: {},
	    getRequest: function(input, bounds, fullObject) {
	    	var selected =  fullObject ? input : _.where(service.lastSelected, { 'formatted_address': input })[0] || service.lastSelected[0];
	    	var requestObject = {};
	    	if(selected) {
		    	_.each(selected.address_components, function(component) {
		    		if(component.types[0] === 'locality' || component.types[0] === 'administrative_area_level_1' || component.types[0] === 'postal_code') {
			    		requestObject[component.types[0]] = component.short_name;
			    	}
		    	});
		    	if(bounds) {
			    	requestObject.geometry = selected.geometry;
			    }
			  }
			  else {
		  		requestObject.locality = input;
			  }
	    	return requestObject;
	    },
	    getResults: function(input, fullObject) {
	    	var requestObject = service.getRequest(input, true, fullObject);
	    	$location.$$search = {};
	  	  $location.search('NELAT', requestObject.geometry.bounds.northeast.lat);
	  	  $location.search('NELONG', requestObject.geometry.bounds.northeast.lng);
	  	  $location.search('SWLAT', requestObject.geometry.bounds.southwest.lat);
	  	  $location.search('SWLONG', requestObject.geometry.bounds.southwest.lng);
	  	  $location.search('q', fullObject ? input.formatted_address : input);
	      _.each(requestObject, function(value, key) {
	        if(key !== 'geometry') {
	          $location.search(key, value);
	        }
	      });
	      service.searching = true;
	  		$location.path('/results');	
    	},
    	schoolsComponentMap: {
	  		locality: 'address.city',
	  		administrative_area_level_1: 'address.state',
	  		administrative_area_level_2: 'address.county',
	  		postal_code: 'address.zip',
	  		country: 'address.country',
	  		latitude: 'coordinates.latitude',
	  		longitude: 'coordinates.longitude'
	  	},
	  	homesComponentMap: {
	  		locality: 'listing.address.city',
	  		administrative_area_level_1: 'listing.address.stateorprovince',
	  		administrative_area_level_2: 'listing.address.county',
	  		postal_code: 'listing.address.postalcode',
	  		country: 'listing.address.country',
	  		latitude: 'listing.location.latitude',
	  		longitude: 'listing.location.longitude'
	  	}
    }
    return service;
  });
