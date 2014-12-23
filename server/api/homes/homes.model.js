'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HomeSchema = new Schema({
    listing: {
        score: {
          realEstate: Number,
          school: Number
        },
        address: {
            preferenceorder: [ Number ],
            addresspreferenceorder: [ Number ],
            fullstreetaddress: [ String ],
            unitNumber: [ Number ],
            city: String,
            stateorprovince: String,
            postalcode: Number,
            country: [ String ]
        },
        listprice: [ Number ],
        listpricelow: [ Number ],
        alternateprices: [{
            alternateprice: {
                alternatelistprice: [ Number ],
                alternatelistpricelow: [ Number ]
            }
        }],
        listingurl: [ String ],
        providername: [ String ],
        providerurl: [ String ],
        providercategory: [ String ],
        leadroutingemail: [ String ],
        bedrooms: [ Number ],
        bathrooms: [ Number ],
        propertytype: [ String ],
        propertysubtype: [ String ],
        listingkey: [ String ],
        listingcategory: [ String ],
        listingstatus: [ String ],
        marketinginformation: [{
            permitaddressoninternet: [ Boolean ],
            vowaddressdisplay: [ Boolean ],
            vowautomatedvaluationdisplay: [ Boolean ],
            vowconsumercomment: [ Boolean ]
        }],
        photos: [{
            photo: [
                {
                    mediamodificationtimestamp: [ Date ],
                    mediaurl: [ String ],
                    mediacaption: [ String ],
                    mediadescription: [ String ],
                    storedId: String
                }
            ]
        }],
        discloseaddress: [ Boolean ],
        listingdescription: [ String ],
        mlsid: [ String ],
        mlsname: [ String ],
        mlsNumber: [ Number ],
        livingarea: [ Number ],
        lotsize: [ Number ],
        yearbuilt: [ Number ],
        listingDate: [ Date ],
        listingtitle: [ String ],
        fullbathrooms: [ Number ],
        threequarterbathrooms: [ Number ],
        halfbathrooms: [ Number ],
        onequarterbathrooms: [ Number ],
        foreclosurestatus: [ String ],
        listingparticipants: {
            participant: {
                participantkey: [ String ],
                participantid: [ Number ],
                firstname: [ String ],
                lastname: [ String ],
                role: [ String ],
                primarycontactphone: [ String ],
                officephone: [ Number ],
                email: [ String ],
                fax: [ Number ],
                websiteurl: [ String ]
            }
        },
        virtualtours: {
            virtualtour: {
                mediamodificationtimestamp: [ Date ],
                mediaurl: [ String ],
                mediacaption: [ String ],
                mediadescription: [ String ]
            }
        },
        videos: {
            video: {
                mediamodificationtimestamp: [ Date ],
                mediaurl: [ String ],
                mediacaption: [ String ],
                mediadescription: [ String ]
            }
        },
        offices: {
            office: {
                officekey: [ String ],
                officeid: [ String ],
                level: [ String ],
                officecode: {
                    officecodeid: [ String ]
                },
                name: [ String ],
                corporatename: [ String ],
                brokerid: [ String ],
                phoneNumber: [ String ],
                address: {
                    preferenceorder: [ Number ],
                    addresspreferenceorder: [ Number ],
                    fullstreetaddress: [ String ],
                    unitNumber: [ Number ],
                    city: [ String ],
                    stateorprovince: [ String ],
                    postalcode: [String],
                    country: [ String ]
                },
                website: [ String ]
            }
        },
        brokerage: {
            name: [ String ],
            phone: [ String ],
            email: [ String ],
            websiteurl: [ String ],
            logourl: [ String ],
            address: {
                preferenceorder: [ Number ],
                addresspreferenceorder: [ Number ],
                fullstreetaddress: [ String ],
                unitNumber: [ Number ],
                city: [ String ],
                stateorprovince: [ String ],
                postalcode: [ Number ],
                country: [ String ]
            }
        },
        franchise: {
            name: [ String ]
        },
        builder: {
            name: [ String ],
            phone: [ String ],
            fax: [ String ],
            email: [ String ],
            websiteurl: [ String ],
            address: {
                preferenceorder: [ Number ],
                addresspreferenceorder: [ Number ],
                fullstreetaddress: [ String ],
                city: [ String ],
                stateorprovince: [ String ],
                postalcode: [ Number ]
            }
        },
        location: {
            latitude: Number,
            longitude: Number,
            elevation: [ String ],
            directions: [ String ],
            geocodeoptions: [ String ],
            county: [ String ],
            parcelid: [ String ],
            community: {
                subdivision: [ String ],
                schools: {
                    school: [
                        {
                            name: [ String ],
                            schoolcategory: [ String ],
                            district: [ String ],
                            description: [ Boolean ]
                        }
                    ],
                }
            },
            neighborhoods: {
                neighborhood: [
                    {
                        name: [ String ],
                        description: [ String ]
                    }
                ]
            }
        },
        openhouses: {
            openhouse: {
                Date: [ Date ],
                starttime: [ String ],
                endtime: [ String ],
                description: [ String ]
            }
        },
        taxes: {
            tax: [
                {
                    year: [ Date ],
                    amount: [ Number ],
                    taxdescription: [ String ]
                },
                {
                    year: [ Date ],
                    amount: [ Number ],
                    taxdescription: [ String ]
                }
            ]
        },
        expenses: {
            expense: [
                {
                    expensecategory: [ String ],
                    expensevalue: [ Number ]
                }
            ]
        },
        detailedcharacteristics: {
            appliances: {
                appliance: [
                     String 
                ]
            },
            architecturestyle: [ String ],
            hasattic: [ Boolean ],
            hasbarbecuearea: [ Boolean ],
            hasbasement: [ Boolean ],
            buildingunitcount: [ Number ],
            iscableready: [ Boolean ],
            hasceilingfan: [ Boolean ],
            condofloornum: [ Number ],
            coolingsystems: {
                coolingsystem: [ String ]
            },
            hasdeck: [ Boolean ],
            hasdisabledaccess: [ Boolean ],
            hasdock: [ Boolean ],
            hasdoorman: [ Boolean ],
            hasdoublepanewindows: [ Boolean ],
            haselevator: [ Boolean ],
            exteriortypes: {
                exteriortype: [
                     String 
                ]
            },
            hasfireplace: [ Boolean ],
            floorcoverings: {
                floorcovering: [
                     String 
                ]
            },
            hasgarden: [ Boolean ],
            hasgatedentry: [ Boolean ],
            hasgreenhouse: [ Boolean ],
            heatingfuels: {
                heatingfuel: [ String ]
            },
            heatingsystems: {
                heatingsystem: [ String ]
            },
            hashottubspa: [ Boolean ],
            intercom: [ Boolean ],
            hasjettedbathtub: [ Boolean ],
            haslawn: [ Boolean ],
            legaldescription: [ String ],
            hasmotherinlaw: [ Boolean ],
            isnewconstruction: [ Boolean ],
            numfloors: [ Number ],
            numparkingspaces: [ Number ],
            haspatio: [ Boolean ],
            haspond: [ Boolean ],
            haspool: [ Boolean ],
            hasporch: [ Boolean ],
            rooftypes: {
                rooftype: [ String ]
            },
            roomcount: [ Number ],
            rooms: {
                room: [
                      String 
                  ]
            },
            hasrvparking: [ Boolean ],
            hassauna: [ Boolean ],
            hassecuritysystem: [ Boolean ],
            hasskylight: [ Boolean ],
            hassportscourt: [ Boolean ],
            hassprinklersystem: [ Boolean ],
            hasvaultedceiling: [ Boolean ],
            viewtypes: {
                viewtype: [ String ]
            },
            iswaterfront: [ Boolean ],
            haswetbar: [ Boolean ],
            iswired: [ Boolean ],
            yearupDated: [ Date ]
        },
        modificationtimestamp: [ Date ],
        disclaimer: [ String ]
    },
    ingestDate: Date,
    status: String
});

HomeSchema.index({ 'listing.location.latitude': 1, 'listing.location.longitude': 1 });
HomeSchema.index({ 'listing.address.stateorprovince': 1, 'listing.address.city': 1 });
module.exports = mongoose.model('Home', HomeSchema);