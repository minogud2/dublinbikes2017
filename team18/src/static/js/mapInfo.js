$(document).ready(function() {
    initMap();
});

var map; // define a map as a gloable varibae to sue with different functions 
var heatmap; // declare a heatmap gloable variabe to be sued for toggle function
var chartDiv2;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(53.3498053, -6.260309699999993),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    }); //closeing map creation 

    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    
    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f", null, function(data) {
        // we decide to use live api to get most updated info of the dynamic data , to produce maker and inforwindo .
        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
            content: '<div class="scrollFix">' + "holding..." + '</div>',
        }); // close infowindow ;

        var marker, i;

        for (var i = 0; i < data.length; i++) {

            var stations = data[i];
            var d = new Date();
            var y = d.setMinutes(d.getMinutes() - 5);
            var hours = d.getHours();
            var minutes = d.getMinutes()
            var ampm = hours >= 12 ? 'pm' : 'am';
            // console.log(y)
            // sue current time for last update in the from HH/MM mins 5 mins 
            var contentString = '<div id="content", class="scrollFix">' + '<div id="windowText">' +
                '<p><b>' + 'Station No: </b>' + stations.number + '<br><b>Station: </b>' + stations.address + '</br><b>Last Update: </b>' + hours + ':' + minutes + ampm + '</br><b>Available bikes: </b>' + stations.available_bikes + '<br><b>Empty Bike Stands: </b>' + stations.available_bike_stands + '<br><br><button onclick="showWeek()">Weekly Chart</button>' + '<div id="chartDiv1"></div>' + '</div>' + '<div id="chartDiv2"></div>'+'</div>';
            
                // pupulate the content string for inforwindow 
            var totalAvailable = (stations.available_bikes) / ((stations.available_bikes) + (stations.available_bike_stands));
            var newMarker;
            //this nested if and else are decide for switching icon based on how busy the station is 
            if (totalAvailable == 0) {
                newMarker = '../static/images/markers/icon10.png';
            } else if (totalAvailable > 0 && totalAvailable <= 0.1) {
                newMarker = '../static/images/markers/icon9.png'; // url
            } else if (totalAvailable > 0.1 && totalAvailable <= 0.2) {
                newMarker = '../static/images/markers/icon8.png'; // url
            } else if (totalAvailable > 0.2 && totalAvailable <= 0.3) {
                newMarker = '../static/images/markers/icon7.png'; // url
            } else if (totalAvailable > 0.4 && totalAvailable <= 0.5) {
                newMarker = '../static/images/markers/icon6.png'; // url
            } else if (totalAvailable > 0.5 && totalAvailable <= 0.6) {
                newMarker = '../static/images/markers/icon5.png'; // url
            } else if (totalAvailable > 0.6 && totalAvailable <= 0.7) {
                newMarker = '../static/images/markers/icon4.png'; // url
            } else if (totalAvailable > 0.7 && totalAvailable <= 0.8) {
                newMarker = '../static/images/markers/icon3.png'; // url
            } else if (totalAvailable > 0.8 && totalAvailable <= 0.9) {
                newMarker = '../static/images/markers/icon2.png'; // url
            } else if (totalAvailable > 0.9 && totalAvailable < 1) {
                newMarker = '../static/images/markers/icon1.png'; // url
            } else if (stations.status == 'CLOSED') {
                newMarker = '../static/images/markers/iconOff.png'; // url
            } else {
                newMarker = '../static/images/markers/icon0.png'; // url
            }
            //defined maker here 
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(stations.position.lat, stations.position.lng),
                map: map,
                stationNum: stations.number,
                info: contentString,
                icon: newMarker

            }); // close maker declaration 

            var clickStation;

            // infowindow.open(map, newMarkers[i]); // make inforwin

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    // infowindow.setContent(contentString);
                    infowindow.setContent(this.info);
                    infowindow.open(map, this);
                    clickedStation = this.stationNum;
                    // select_station(clickStation);
                    // this ajax funciton is to grab a station num and send it to flask to be used as a query key.
                    $.ajax({
                        type: 'POST',
                        url: "/selectedStation",
                        contentType: 'application/json;charset=UTF-8',
                        data: JSON.stringify({
                            'data': clickedStation
                        }),
                        datatype: "json"
                    }) // close ajax  
                } // close function

            })(marker, i)); // close maker click event 

            // this is event function to display chart we generated from other js file. 
            google.maps.event.addDomListener(marker, 'click', (function(marker, i) {
                return function() {
                    makeChart(this);
                    makeChartW(this); //buffer                    
                    map.setCenter(marker.getPosition());
                } // close function 
            })(marker, i)); // close another event 
            
        } //close loop
    }); //close get json 
        
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getdata(),
        map: map,
        radius: 10
    });
} // close init_map function
//this funciton is to use switch on and off the heatmap ;
function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
} // close toglle 

function getdata() {
    var heatmapData = [];
    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f", null, function(data) {

        for (var i = 0; i < data.length; i++) {
            var stations = data[i];
            // give heap map data a varibale to hold data 

            heatmapData.push({
                location: new google.maps.LatLng(stations.position.lat, stations.position.lng),
                weight: stations.available_bikes
            });
        }
    })

    return heatmapData;
}


// this function is for auto complete for my search station function, it use library  -- jquery UI, i populated array availableTaps with station names; 
// from live data.
$(function() {
    var availableTags = [];
    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f", null, function(data) {
        for (var i = 0; i < data.length; i++) {
            var stations = data[i];
            availableTags.push(stations.address);
        }
    })
    $("#tags").autocomplete({
        source: availableTags
    });
});
