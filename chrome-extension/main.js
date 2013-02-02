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

        // Alter font color based on score. Needs refactoring
        if (data['score'] > 84){
            toBeAppended = "<div class=\'dine-score\' style=\'color: #87b800 \'>" + data['score'] + "</div>"
        } else if (data['score'] >= 70) {
            toBeAppended = "<div class=\'dine-score\' style=\'color: #fed51b \'>" + data['score'] + "</div>"
        } else if (data['score'] < 70) {
            toBeAppended = "<div class=\'dine-score\' style=\'color: #e9152b \'>" + data['score'] + "</div>"
        } else{
            toBeAppended = "<div class=\'dine-score\'>" + data['score'] + "</div>"
        } 

        // Let's start building this table
        // Append all the elements!
        toBeAppended += "<div class=\'dine-title\'>DineSafe Score</div>"
        toBeAppended += "<div class=\'dine-title\'>" + data['name'] + "</div>"
        toBeAppended += "<table><thead><tr><th>Date</th><th>Pass/Fail?</th></tr></thead><tbody>"

        for(i in data['inspections']) {
            date = data['inspections'][i]['date'];
            result = data['inspections'][i]['status']
            console.log(date + " : " + result);
            
            // Make that time pretty using relative dates
            toBeAppended += "<tr><th>" + getPrettyTime(date) + "</th>"

            if (result == "Pass"){
                toBeAppended += "<th style=\'color: #87b800 \'>" + result + " ✔ </th></tr>"
            }else if (result == "Conditional Pass"){
                toBeAppended += "<th style=\'color: #fed51b \'>" + result + "</th></tr>"
            }else {
                toBeAppended += "<th style=\'color: #fed51b \'>" + result + "</th></tr>"
            }
        }
        toBeAppended += "</tbody></table>"

        // Inject markup to DOM
        $("#dine-safe").append(toBeAppended);
    });
}

function getPrettyTime (dirtyDate) {
    return moment(dirtyDate).fromNow();
}


