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

        var locations = [ //where to pull in map data, db, json?
            [42, 'SMITHFIELD NORTH', 'Smithfield North', 53.349562, -6.278198],
             [30, 'PARNELL SQUARE NORTH', 'Parnell Square North', 53.353462, -6.265305],
             [32, 'PEARSE STREET', 'Pearse Street', 53.344304, -6.250427],
             [48, 'EXCISE WALK', 'Excise Walk', 53.347777, -6.244239], 
             [13, 'FITZWILLIAM SQUARE WEST', 'Fitzwilliam Square West', 53.336074, -6.252825],
             [81, 'ST. JAMES HOSPITAL (CENTRAL)', 'St. James Hospital (Central)', 53.339983, -6.295594],
             [68, 'HANOVER QUAY', 'Hanover Quay', 53.344115, -6.237153],
             [74, 'OLIVER BOND STREET', 'Oliver Bond Street', 53.343893, -6.280531],
             [87,'COLLINS BARRACKS MUSEUM','Collins Barracks Museum', 53.347477, -6.28525],
             [84, 'BROOKFIELD ROAD', 'Brookfield Road', 53.339005, -6.300217]
        ];
                
        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(53.3498053, -6.260309699999993), 
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var infowindow = new google.maps.InfoWindow();
        var marker, i;

        for (var i = 0; i < locations.length; i++) {  
            var value = locations[i];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(value[3], value[4]),
                map: map
          });    
            var contentString = '<div id="content">'+
             '<div id="siteNotice">'+'</div>'+
            '<div id="bodyContent">'+
            '<p> ' + value[2] + '<br>Station: '+ value[1] + '<br>Available bikes: <b>' + value[3] + '</b><br>' + 'Free Stands: <b>' + value[4] + '</b></p>'+
            '</div>'+
            '</div>';
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(contentString);
                  infowindow.open(map, marker);
                }
              })(marker, i));
            }
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        map.data.setStyle({
        strokeOpacity: 0.1,
        fillOpacity: 0.0,
        strokeWeight: 2,
        });         
    }          