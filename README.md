Dineviz - A Better Way to View DineSafe Toronto Data
=======

The City of Toronto is getting better with releasing data to the public. Unfortunately it's often poorly formatted and cumbersome for the general public to look at. We looked at the DineSafe Toronto Data Set and set out to make the data more easily understood both for future developer and the general public. We built four components to tackly this: a normalized JSON API, a map vizualization, a Chrome extennsion for FourSquare integration, and a mobile web app for accessing the data on the go.

##DineSafe Vizualization

A visualization of the DineSafe which can be drilled down by score and category.

![DineSafe Vizualization](http://f.cl.ly/items/0T0W3j1u2v321i0P2Q3j/Screen%20Shot%202013-02-02%20at%203.00.52%20PM.png)

### How it Works
The data is loaded into [crossfilter](http://square.github.com/crossfilter/), which allows fast filtering of the data. The map is rendered in [leaflet](http://leafletjs.com/) with a layer on top drawn with HTML Canvas.

##DineSafe Chrome Extension

A Chrome extension that let's you view DineSafe Toronto data in FourSquare — automagically!

![DineSafe](http://f.cl.ly/items/2j2W223v1B0o0B1B0s1L/Screen%20Shot%202013-02-02%20at%202.12.53%20PM.png)

###How to Install
1) Download the Chrome extension (.crx): [here](http://cl.ly/Md4Z)  
2) Click the Settings icon on the browser toolbar (Top Right Corner) in Chrome  
3) Select Tools > Extensions  
4) Locate the "crx" extension file on your computer - drag and drop the file onto the Extensions page from step 2 and click Install.  
5) Ever wanted to see DineSafe data for a venue on FourSquare? Now's your chance! Head to any venue page (within Toronto) and indulge (or be appauled) at just what's going on down at the local cafe.  
6) Once the extension is installed it will work its magic when you navigate to a venue.

###How the Extension Works
After installing the extension, when a user hits a FourSquare venue **[foursquare.com/v/VENUE_NAME/*]** the extension extracts the venueID and makes an JavaScript JSON call to FourSquare to get the latitude and longitude of the venue. Once we get the geographical data back we send a request to a server that houses a DineSafe API we built along with the name of the venue (from FourSquare).   

Server side we then narrow down potential matches based on lat/long and a venue name fuzzy search in an attempt to match up the FourSquare and DineSafe data. The server also stores a precalculated score for how "DineSafe" a place is based on the accumulation of previous inspections. This score along with all inspections are returned to the client and injected into the DOM.

##DineMob — A Mobile App for DineSafe Data

One liner.

![DineMob](http://f.cl.ly/items/3m1m1o2N0P2a3c3B0a0O/dinesafe-mobile-flow.jpg)

### How it Works
Uses the HTML5 Locations API to poll a users location and show the nearest 10 venue locations. Users can then drill down into the data to get granular inspection data about each place.

##DineSafe API Server

A simple API to access Toronto Public Health's [DineSafe](http://www.toronto.ca/health/dinesafe/index.htm) data. In addition to the data published by DineSafe, the results include the geocoded coordinates of the address and a point score assigned based on recent infractions. The server loads the data into an in-memory R-Tree to provide efficient location queries.

Calls
-----

### Establishment Information

    http://[base_url]/establishment?id=[establishment_id]

Return the data on a specific establishment.

#### Example Request

    http://[base_url]/establishment?id=9013708

#### Example Response

    {
        name: "SECOND CUP",
        lon: -79.3716892,
        score: "100",
        address: "163 KING ST E",
        lat: 43.6504456,
        inspections: {
            102475629: {
                date: "2011-03-10",
                infractions: [ ],
                status: "Pass"
            },
            102692460: {
                date: "2012-02-09",
                infractions: [ ],
                status: "Pass"
            }
        },
        type: "Restaurant",
        id: 9013708
    }

### Random Establishment

    http://[base_url]/random

Return the data on a random establishment.

#### Example Request

    http://[base_url]/random

#### Example Response

    {
        name: "TAH DEEG",
        lon: -79.4149499,
        score: "100",
        address: "5525 YONGE ST",
        lat: 43.7784115,
        inspections: {
            102492978: {
                date: "2011-03-24",
                infractions: [
                    {
                        action: "Notice to Comply",
                        severity: "S - Significant",
                        amount_fined: "NA",
                        details: "Operator fail to provide easily readable thermometer(s)",
                        court_outcome: ""
                    },
                    {
                        action: "Notice to Comply",
                        severity: "S - Significant",
                        amount_fined: "NA",
                        details: "Operator fail to provide separate handwashing sink(s)",
                        court_outcome: ""
                    },
                    {
                        action: "Notice to Comply",
                        severity: "NA - Not Applicable",
                        amount_fined: "NA",
                        details: "Fail to post the eating and drinking establishment license adjacent to the food safety inspection notice - Municipal Code Chapter 545 Sec. 5G(4)",
                        court_outcome: ""
                    },
                    {
                        action: "Notice to Comply",
                        severity: "S - Significant",
                        amount_fined: "NA",
                        details: "Operator fail to provide required supplies at sinks",
                        court_outcome: ""
                    }
                ],
                status: "Conditional Pass"
            },
            102493047: {
                date: "2011-04-01",
                infractions: [ ],
                status: "Pass"
            },
            102574840: {
                date: "2011-08-09",
                infractions: [ ],
                status: "Pass"
            },
            102639764: {
                date: "2011-11-24",
                infractions: [ ],
                status: "Pass"
            },
            102702985: {
                date: "2012-02-27",
                infractions: [ ],
                status: "Pass"
            },
            102775111: {
                date: "2012-06-25",
                infractions: [ ],
                status: "Pass"
            },
            102878032: {
                date: "2012-12-18",
                infractions: [ ],
                status: "Pass"
            }
        },
        type: "Food Take Out",
        id: 10397287
    } 

### Establishments Near Location

    http://[base_url]/near?lat=[latitude]&lon=[longitude]&n=[num_results]

Return the _n_ nearest results to a given coordinate. _n_ defaults to 10.

#### Example Request

    http://[base_url]/near?lat=-79.2653504&lon=43.7712337&n=2

#### Example Response

    [
        {
            name: "SUBWAY",
            lon: -79.1367173,
            score: "100",
            address: "5550 LAWRENCE AVE E",
            lat: 43.7795895,
            inspections: {
                102392547: {
                    date: "2011-02-28",
                    infractions: [ ],
                    status: "Pass"
                },
                102614413: {
                    date: "2011-10-12",
                    infractions: [ ],
                    status: "Pass"
                },
                102846127: {
                    date: "2012-10-23",
                    infractions: [ ],
                    status: "Pass"
                }
            },
            type: "Restaurant",
            id: 10287417
        },
        {
            name: "MR BEAN COFFEE CO",
            lon: -79.1367173,
            score: "100",
            address: "5550 LAWRENCE AVE E",
            lat: 43.7795895,
            inspections: {
                102392522: {
                    date: "2011-02-28",
                    infractions: [ ],
                    status: "Pass"
                },
                102614391: {
                    date: "2011-10-12",
                    infractions: [ ],
                    status: "Pass"
                },
                102846145: {
                    date: "2012-10-23",
                    infractions: [ ],
                    status: "Pass"
                }
            },
            type: "Restaurant",
            id: 10317653
        }
    ]

### Fuzzy Match

    http://[base_url]/fuzzy_match?lat=[latitude]&lon=[longitude]&name=[name]

Match an establishment near a coordinate with a given (possibly inexact) name.

#### Example Request

    http://[base_url]/fuzzy_match?lat=-79.2653504&lon=43.7712337&name=bean

#### Example Response

    {
        name: "MR BEAN COFFEE CO",
        lon: -79.1367173,
        score: "100",
        address: "5550 LAWRENCE AVE E",
        lat: 43.7795895,
        inspections: {
            102392522: {
                date: "2011-02-28",
                infractions: [ ],
                status: "Pass"
            },
            102614391: {
                date: "2011-10-12",
                infractions: [ ],
                status: "Pass"
            },
            102846145: {
                date: "2012-10-23",
                infractions: [ ],
                status: "Pass"
            }
        },
        type: "Restaurant",
        id: 10317653
    }
