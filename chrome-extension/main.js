// By default content_script is automatically run 
// after the browser fires window.onload

initalize();

function initalize(){
    var venueID = $("link[rel^='canonical']")[0]["href"].split("/")[5]
    console.log("Current venue is " + venueID);

    // Add a nice little div for us place data
    $("<div id=\'dine-safe\' class=\'box\'></div>").insertAfter("#actionBar");
    makeFourSquareRequest(venueID);
}

function makeFourSquareRequest(venueID) {
    var requestURL = "https://api.foursquare.com/v2/venues/" + venueID + "?oauth_token=I1KJVE1N2P5CXOB3ZKBSBRW4E2LHOGFTHBGYS1OJ0FYGH0LL&v=20130201"
    $.getJSON(requestURL, function(data){
        lat = data['response']['venue']['location']['lat'];
        lng = data['response']['venue']['location']['lng'];
        venueName = data['response']['venue']['name']
        console.log("lat is: " + lat + " lng is: " + lng);
        makeDineSafeRequest(lat, lng, venueName)
    });
}

function makeDineSafeRequest(lat, lng, venueName) {
    var requestURL = "http://ec2-184-73-102-222.compute-1.amazonaws.com:8080/fuzzy_match?lat=" + lat + "&lon=" + lng + "&name=" + venueName
    $.getJSON(requestURL, function(data){

        $("#dine-safe").append("<div class=\'dine-score\'>" + data['score'] + "</div>");
        $("#dine-safe").append("<div class=\'dine-title\'>DineSafe Score</div>");
        $("#dine-safe").append( data['name'] )
        $("#dine-safe").append("<table><thead><tr><th>Date</th><th>Pass/Fail?</th></tr></thead><tbody>")

        for(i in data['inspections']) {
            date = data['inspections'][i]['date'];
            result = data['inspections'][i]['status']
            console.log(date + " : " + result);
            $("#dine-safe").append("<tr><th>" + date + "</th><th>" + result + "</th></tr>")
        }
        $("#dine-safe").append("</tbody></table>");
    });
}


