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