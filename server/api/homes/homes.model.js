'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Strip off commons, -
var HomeSchema = new Schema({
  listing: {
    address : [
      {
        preferenceorder : [
          Number
        ],
        addresspreferenceorder : [
          Number
        ],
        fullstreetaddress : [
          String
        ],
        city : [
          String
        ],
        stateorprovince : [
          String
        ],
        postalcode : [
          Number
        ],
        country : [
          String
        ]
      }
    ],
    listprice : [
      Number
    ],
    listingurl : [
      String
    ],
    providername : [
      String
    ],
    providerurl : [
      String
    ],
    providercategory : [
      String
    ],
    leadroutingemail : [
      String
    ],
    bedrooms : [
      Number
    ],
    bathrooms : [
      Number
    ],
    propertytype : [
      String
    ],
    propertysubtype : [
      String
    ],
    listingkey : [
      String
    ],
    listingcategory : [
      String
    ],
    listingstatus : [
      String
    ],
    marketinginformation : [
      {
        permitaddressoninternet : [
          Boolean
        ],
        vowaddressdisplay : [
          Boolean
        ],
        vowautomatedvaluationdisplay : [
          Boolean
        ],
        vowconsumercomment : [
          Boolean
        ]
      }
    ],
    discloseaddress : [
      Boolean
    ],
    listingdescription : [
      String
    ],
    mlsid : [
      String
    ],
    mlsname : [
      String
    ],
    mlsnumber : [
      String
    ],
    lotsize : [
      Number
    ],
    listingdate : [
      Date
    ],
    listingtitle : [
      String
    ],
    fullbathrooms : [
      Number
    ],
    threequarterbathrooms : [
      Number
    ],
    halfbathrooms : [
      Number
    ],
    onequarterbathrooms : [
      Number
    ],
    partialbathrooms : [
      Number
    ],
    listingparticipants : [
      {
        participant : [
          {
            participantkey : [
              String
            ],
            participantid : [
              Number
            ],
            firstname : [
              String
            ],
            lastname : [
              String
            ],
            role : [
              String
            ],
            primarycontactphone : [
              String
            ],
            officephone : [
              String
            ],
            email : [
              String
            ],
            websiteurl : [
              String
            ]
          }
        ]
      }
    ],
    offices : [
      {
        office : [
          {
            officekey : [
              String
            ],
            officeid : [
              String
            ],
            officecode : [
              {
                officecodeid : [
                  String
                ]
              }
            ],
            name : [
              String
            ],
            corporatename : [
              String
            ],
            brokerid : [
              String
            ],
            mainofficeid : [
              String
            ],
            phonenumber : [
              String
            ],
            address : [
              {
                preferenceorder : [
                  Number
                ],
                addresspreferenceorder : [
                  Number
                ],
                fullstreetaddress : [
                  String
                ],
                city : [
                  String
                ],
                stateorprovince : [
                  String
                ],
                postalcode : [
                  Number
                ],
                country : [
                  String
                ]
              }
            ],
            officeemail : [
              String
            ]
          }
        ]
      }
    ],
    brokerage : [
      {
        name : [
          String
        ],
        phone : [
          String
        ],
        email : [
          String
        ]
      }
    ],
    location : [
      {
        latitude : [
          Number
        ],
        longitude : [
          Number
        ],
        directions : [
          String
        ],
        county : [
          String
        ],
        parcelid : [
          String
        ],
        community : [
          {
            subdivision : [
              String
            ],
            schools : [
              {
                school : [
                  {
                    schoolcategory : [
                      String
                    ],
                    district : [
                      String  
                    ]
                  },
                  {
                    schoolcategory : [
                      String
                    ],
                    district : [
                      String
                    ]
                  },
                  {
                    schoolcategory : [
                      String
                    ],
                    district : [
                      String
                    ]
                  },
                  {
                    schoolcategory : [
                      String
                    ],
                    district : [
                      String
                    ]
                  }
                ]
              }
            ]
          }
        ],
        zoning : [
          String
        ]
      }
    ],
    taxes : [
      {
        tax : [
          {
            amount : [
              Number
            ],
            taxdescription : [
              String
            ]
          }
        ]
      }
    ],
    detailedcharacteristics : [
      {
        architecturestyle : [
          String
        ],
        isnewconstruction : [
          Boolean
        ],
        rooftypes : [
          {
            rooftype : [
              String
            ]
          }
        ]
      }
    ],
    modificationtimestamp : [
      Date
    ],
    disclaimer : [
      String
    ]
  }
});

module.exports = mongoose.model('Home', HomeSchema);