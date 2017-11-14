import React from 'react';
import ReactDOM from 'react-dom';

class GoogleMap extends React.Component {
  render() {
    return(
      <input ref='workLatitude' type='hidden'/>
      <input ref='workLongitude' type='hidden' />
      <div ref='mapContainer'>google map</div>
    )
  }
}

export default GoogleMap;

var LATITUDE_ELEMENT_REF = "course_latitude";
  var LONGITUDE_ELEMENT_REF = "course_longitude";
  var MAP_DIV_ELEMENT_REF = "google_map";

  var DEFAULT_ZOOM_WHEN_NO_COORDINATE_EXISTS = 1;
  var DEFAULT_CENTER_LATITUDE = 22;
  var DEFAULT_CENTER_LONGITUDE = 13;
  var DEFAULT_ZOOM_WHEN_COORDINATE_EXISTS = 15;

  // This is the zoom level required to position the marker
  var REQUIRED_ZOOM = 15;

  google.load("maps", "2.x");

  // The google map variable
  var map = null;

  // The marker variable, when it is null no marker has been added
  var marker = null;

export const initializeGoogleMap = () => {
  console.log('initializing');
  map = new google.maps.Map2(React.findDOMNode(this.refs[MAP_DIV_ELEMENT_REF]));
  console.log(map);
    map.addControl(new GLargeMapControl());
    map.addControl(new GMapTypeControl());

    map.setMapType(G_NORMAL_MAP);

    var latitude = +React.findDOMNode(this.refs[LATITUDE_ELEMENT_REF]).value;
    var longitude = +React.findDOMNode(this.refs[LONGITUDE_ELEMENT_REF]).value;

    if(latitude != 0 && longitude != 0) {
      //We have some sort of starting position, set map center and marker
      map.setCenter(new google.maps.LatLng(latitude, longitude), DEFAULT_ZOOM_WHEN_COORDINATE_EXISTS);
      var point = new GLatLng(latitude, longitude);
      marker = new GMarker(point, {draggable:false});
      map.addOverlay(marker);
    } else {
      // Just set the default center, do not add a marker
      map.setCenter(new google.maps.LatLng(DEFAULT_CENTER_LATITUDE, DEFAULT_CENTER_LONGITUDE), DEFAULT_ZOOM_WHEN_NO_COORDINATE_EXISTS);
    }

    GEvent.addListener(map, "click", googleMapClickHandler);
  }


  function googleMapClickHandler(overlay, latlng, overlaylatlng) {

    if(map.getZoom() < REQUIRED_ZOOM) {
      alert("You need to zoom in more to set the location accurately." );
      return;
    }
    if(marker == null) {
      marker = new GMarker(latlng, {draggable:false});
      map.addOverlay(marker);
    }
    else {
      marker.setLatLng(latlng);
    }
    React.findDOMNode(this.refs[LATITUDE_ELEMENT_REF]).value = latlng.lat();
    React.findDOMNode(this.refs[LONGITUDE_ELEMENT_REF]).value = latlng.lng();

  }

google.setOnLoadCallback(initializeGoogleMap);
