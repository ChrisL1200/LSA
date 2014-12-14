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
      weight: 1
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
  advancedHomeRangeFilters: {
    sqFt: {
      name: "SqFT",
      min: '',
      max: '',
      minRange: 0,
      maxRange: 10000
    },
    price: {
      name: "Price",
      min: '',
      max: '',
      minRange: 0,
      maxRange: 5000000
    }
  },
  advancedHomeFilters: {
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
