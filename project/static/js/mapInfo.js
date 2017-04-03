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
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
       $.getJSON("http://127.0.0.1:5000/stations1", null, function(data){
          if ('stations' in data) {
              var locations = data.stations; 
              // console.log(locations)
            }
            var infowindow = null;
            infowindow = new google.maps.InfoWindow({
                content: "holding..."
            });
            var marker, i;

        for (var i = 0; i < locations.length; i++) {  
            var value = locations[i];

            var contentString = '<div id="content">'+
             '<div id="siteNotice">'+'</div>'+
            '<div id="bodyContent">'+
            '<p> ' + 'StationNo.: '+ value[0] + '<br>Station: '+ value[1] + '<br>Last Update: <b>'+ value[2]+'<br>Available bikes: <b>' + value[6] + '</b><br>' + 'Free Stands: <b>' + value[7] + '</b></p>'+
            '</div>'+
            '</div>';
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(value[4], value[5]),
                map: map,
                info: contentString

          }); 
             
            
            // infowindow.open(map, newMarkers[i]);
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  // infowindow.setContent(contentString);
                  infowindow.setContent(this.info);
                  infowindow.open(map, this);

                }
              })(marker, i));
        }
        
       }); 

        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
       
        map.data.setStyle({
        strokeOpacity: 0.1,
        fillOpacity: 0.0,
        strokeWeight: 2,
        });
    }     
        