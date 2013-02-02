// By default content_script is automatically run 
// after the browser fires window.onload

initalize();

function initalize(){
    var venueID = $("link[rel^='canonical']")[0]["href"].split("/")[5]
    console.log("Current venue is " + venueID);
    makeFourSquareRequest(venueID);
}

function makeRequest(venueID) {
    var requestURL = "https://api.foursquare.com/v2/venues/" + venueID + "?oauth_token=I1KJVE1N2P5CXOB3ZKBSBRW4E2LHOGFTHBGYS1OJ0FYGH0LL&v=20130201"
    $.getJSON(requestURL, function(data){
        lat = data['response']['venue']['location']['lat'];
        lng = data['response']['venue']['location']['lng'];
        console.log("lat is: " + lat + " lng is: " + lng);
    });
}



