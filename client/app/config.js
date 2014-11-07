angular.module('cruvitaApp').constant('Config', {
  autocompleteService: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCc2xSsYmFpNiHcRk-DuHkSVVxi9Rt9xFA&region=US',
  mapDefaults: {
    center: {},
    zoom: 13,
    polylines: [],
    bounds: { },
    polys: [],
    draw: undefined
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
  },
  incomes: [{label: "Less than 200,000", value: 200000},{label: "200,000 - 300,000", value: 250000},{label: "More than 300,000", value: 300000}]
});