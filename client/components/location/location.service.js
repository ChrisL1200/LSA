'use strict';

angular.module('cruvitaApp')
  .service('Location', function ($http, Config) {
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
	    lastSelected: {}
    }

    return service;
  });
