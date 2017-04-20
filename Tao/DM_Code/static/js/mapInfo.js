$(document).ready(function(){
  initMap();
});

function initMap() {     
        var styledMapType = new google.maps.StyledMapType(
         [
    {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#84b6e3"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#0000a0"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
],
{name: 'Styled Map'})
        
          var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(53.3498053, -6.260309699999993), 
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
          
          }); //closeing map creation 
        
//        var bikeLayer = new google.maps.BicyclingLayer();
//        bikeLayer.setMap(map);
    
        $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f", null, function(data){
          
            var infowindow = null;
            infowindow = new google.maps.InfoWindow({
                content: '<div class="scrollFix">' + "holding..." +'</div>',
            }); // close infowindow ;
            
            var marker, i;
            
            for (var i = 0; i < data.length; i++) {  
                      
                      var stations = data[i];
                      var d = new Date();
                      var y = d.setMinutes(d.getMinutes() -5);
                      var hours = d.getHours();
                      var minutes = d.getMinutes()
                      var ampm = hours >= 12 ? 'pm' : 'am';
                      // console.log(y)
                      
                      var contentString = '<div id="content", class="scrollFix">'+
                      '<p><b>' + 'Station No: </b>'+ stations.number + '<br><b>Station: </b>'+ stations.address + '</br><b>Last Update: </b>' + hours +':' + minutes + ampm + '</br><b>Available bikes: </b>' + stations.available_bikes + '<br><b>Empty Bike Stands: </b>' + stations.available_bike_stands + '<div id="chartDiv1"></div>' + '<div id="chartDiv2"></div>' +
                      '</div>';
        
                      var totalAvailable = (stations.available_bikes)/(stations.available_bike_stands);
                      var newMarker;
            
                            if (totalAvailable == 0){
                                newMarker = '../static/images/markers/icon0.png';
                            }
                            else if (totalAvailable > 0 && totalAvailable <= 0.1){
                                newMarker = '../static/images/markers/icon1.png';// url
                            }
                            else if (totalAvailable > 0.1 && totalAvailable <= 0.2){
                                newMarker = '../static/images/markers/icon2.png';// url
                            }
                            else if (totalAvailable > 0.2 && totalAvailable <= 0.3){
                                newMarker = '../static/images/markers/icon3.png';// url
                            }
                            else if (totalAvailable > 0.4 && totalAvailable <= 0.5){
                                newMarker = '../static/images/markers/icon4.png';// url
                            }
                            else if (totalAvailable > 0.5 && totalAvailable <= 0.6){
                                newMarker = '../static/images/markers/icon5.png';// url
                            }
                            else if (totalAvailable > 0.5 && totalAvailable <= 0.6){
                                newMarker = '../static/images/markers/icon5.png';// url
                                }
                            else if (totalAvailable > 0.6 && totalAvailable <= 0.7){
                                    newMarker = '../static/images/markers/icon6.png';// url
                                }
                            else if (totalAvailable > 0.7 && totalAvailable <= 0.8){
                                    newMarker = '../static/images/markers/icon7.png';// url
                                }
                            else if (totalAvailable > 0.8 && totalAvailable <= 0.9){
                                    newMarker = '../static/images/markers/icon8.png';// url
                                }
                            else if (totalAvailable > 0.9 && totalAvailable < 1){
                                    newMarker = '../static/images/markers/icon9.png';// url
                                }
                            else if (stations.status == 'CLOSED'){
                                    newMarker = '../static/images/markers/iconOff.png';// url
                                }
                            else {
                                newMarker = '../static/images/markers/icon10.png';// url
                            }
                    
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
                                clickedStation=this.stationNum;
                                console.log("differeent ", clickedStation)
                                // select_station(clickStation);
                                $.ajax({
                                    type: 'POST',
                                    url: "/selectedStation",
                                    contentType: 'application/json;charset=UTF-8',
                                    data: JSON.stringify({
                                        'data': clickedStation
                                          }),
                                      datatype: "json"
                                })  // close ajax  
                              } // close function

                          })(marker, i)); // close maker click event 
            
                          
                          google.maps.event.addDomListener(marker, 'click', (function(marker, i) {
                              return function() {
                                  makeChart(this); //buffer
                              } // close function 
                          })(marker, i)); // close another event 

                          var heatmapData=[];  // give heap map data a varibale to hold data 
                          
                          heatmapData.push({location: new google.maps.LatLng(stations.position.lat, stations.position.lng),
                                          weight:stations.available_bikes}); //close populatd heat map data 

                          // var heatmap = new google.maps.visualization.HeatmapLayer({
                          //       data: heatmapData
                          //       map: map

                          // });// close heat map 
            
        }//close loop
  }); //close get json 
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
       
        map.data.setStyle({
        strokeOpacity: 0.1,
        fillOpacity: 0.0,
        strokeWeight: 2,
        }); // close set map style 

       
} // close init_map function
 
 // function heatmap_data(){
 //              $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f", null, function(data){
 //                        for (var i = 0; i < data.length; i++) {  
                      
 //                             var stations = data[i];

 //                             var heatmapData=[];  // give heap map data a varibale to hold data 
                          
 //                               heatmapData.push({location: new google.maps.LatLng(stations.position.lat, stations.position.lng),
 //                                          weight:stations.available_bikes}); 

 //                        }
 //                        return heatmapData;
 //                        console.log(heatmapData)

 //              })
              
 //              return heatmapData;

 // }

 function toggleHeatmap() {
      heatmap.setMap(heatmap.getMap() ? null : map);
  } // close toglle 
