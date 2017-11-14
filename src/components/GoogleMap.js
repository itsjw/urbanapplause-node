import React from 'react'
import scriptLoader from 'react-async-script-loader'

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      map: null
    };
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        var map  = new google.maps.Map(this.refs.map, {
          center: {lat: 10.794234, lng: 106.706541},
          zoom: 12
        });
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
            const marker = new google.maps.Marker({
              position: pos,
              map: map,
              title: 'Hello World!'
            });
          }, () => {
            console.log('navigator disabled');
          });

        } else {
          // Browser doesn't support Geolocation
          console.log('navigator disabled');
        }
      // Create the search box and link it to the UI element.
        var input = this.refs.locationInput;
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        const handleLocationChange = function(place){this.props.onLocationChange(place)}.bind(this);
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            handleLocationChange(place);
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
        this.setState({
            map: map
          });

      }

      else this.props.onError()

    }
  }

  render(){
    return (
      <div>
        <input ref='locationInput' className="controls" type="text" placeholder="Search Box"/>
        <div ref="map" style={{width: '100%', zIndex: '10', height: '200px'}}></div>
          { !this.state.map && <div className="center-md">Loading...</div> }
    </div>
    )
  }
}

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCN9joc20fO_YTL4VRhjeOtcdC3i04zGCs&libraries=places'
  ]
)(GoogleMap)
