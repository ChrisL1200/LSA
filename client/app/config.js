angular.module('lsaApp').constant('Config', {
  autocompleteService: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCc2xSsYmFpNiHcRk-DuHkSVVxi9Rt9xFA&region=US',
  mapDefaults: {
      center: {
        latitude: 37.96771449141076,
        longitude: -76.74215720000001
      },
      polylines: [],
      zoom: 6,
      bounds: { 
         northeast: {
            latitude: 39.466012,
            longitude: -75.24215719999999
         },
         southwest : {
            latitude: 36.5407589,
            longitude: -83.675415
         }
      }
    },
  defaultPolyline: {
    stroke: {
      color: '#6060FB',
      weight: 3
    },
    editable: true,
    draggable: false,
    geodesic: false,
    visible: true,
    clickable: true
  }
});