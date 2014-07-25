angular.module('lsaApp').constant('Config', {
  autocompleteService: 'https://maps.googleapis.com/maps/api/geocode/json',
  mapDefaults: {
      center: {
        latitude: 38,
        longitude: -79.5
      },
      zoom: 6,
      draggable: true,
      bounds: {
         northeast: {
            latitude: 39.466012,
            longitude: -75.24215719999999
         },
         southwest : {
            latitude: 36.5407589,
            longitude: -83.675415
         }
      },
      polylines: [
        {
          id: 1,
          path: [
            {
              latitude: 38.466012,
              longitude: -76.24215719999999
            },
            {
              latitude: 38.466012,
              longitude: -77.24215719999999
            },
            {
              latitude: 37.466012,
              longitude: -77.24215719999999
            },
            {
              latitude: 37.466012,
              longitude: -76.24215719999999
            },
            {
              latitude: 38.466012,
              longitude: -76.24215719999999
            }
          ],
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
      ]
    }
});