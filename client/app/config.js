angular.module('cruvitaApp').constant('Config', {
  autocompleteService: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCc2xSsYmFpNiHcRk-DuHkSVVxi9Rt9xFA&components=country:us',
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
  advancedSchoolFilters: {
    edLevel: { 
      defaultText: 'Education Level',
      options: [{
        label: 'High School',
        value: 'H'
      },{
        label: 'Middle School',
        value: 'M'
      },{
        label: 'Elem School',
        value: 'E'
      }]
    }
  },
  advancedHomeFilters: {
    sqFtMin: {
      defaultText: "Min SqFT",
      options: [{
        label: '500',
        value: 500
      },{
        label: '1000',
        value: 1000
      },{
        label: '1500',
        value: 1500
      },{
        label: '2000',
        value: 2000
      }]
    },
    sqFtMax: {
      defaultText: "Max SqFT",
      options: [{
        label: '1000',
        value: 1000
      },{
        label: '1500',
        value: 1500
      },{
        label: '2000',
        value: 2000
      },{
        label: '2500',
        value: 2500
      }]
    },
    priceMin: {
      defaultText: "Min Price",
      options: [{
        label: '100000',
        value: 100000
      },{
        label: '200000',
        value: 200000
      },{
        label: '300000',
        value: 300000
      },{
        label: '400000',
        value: 400000
      }]
    },
    priceMax: {
      defaultText: "Max Price",
      options: [{
        label: '200000',
        value: 200000
      },{
        label: '300000',
        value: 300000
      },{
        label: '400000',
        value: 400000
      },{
        label: '500000',
        value: 500000
      }]
    },
    propertysubtype: {
      defaultText: "Property Type",
      options: [{
        label: 'Townhouse',
        value: 'Townhouse'
      },{
        label: 'Single Family',
        value: 'Single Family Detached'
      }]
    },
    bathMin: {
      defaultText: "Bathrooms",
      options: [{
        label: '1+',
        value: 1
      },{
        label: '2+',
        value: 2
      },{
        label: '3+',
        value: 3
      },{
        label: '4+',
        value: 4
      }]
    },
    bedMin: {
      defaultText: "Bedrooms",
      options: [{
        label: '1+',
        value: 1
      },{
        label: '2+',
        value: 2
      },{
        label: '3+',
        value: 3
      },{
        label: '4+',
        value: 4
      }]
    },
    lotMin: {
      defaultText: "Lot Size",
      options: [{
        label: '0.1+',
        value: 0.1
      },{
        label: '0.5+',
        value: 0.5
      },{
        label: '1+',
        value: 1
      },{
        label: '5+',
        value: 5
      }]
    }
  }
});
