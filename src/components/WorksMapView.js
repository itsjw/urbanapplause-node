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

        var bounds = new google.maps.LatLngBounds();

          this.props.works.map((work, i) => {
            const pos = {
              lat: work.lat,
              lng: work.lng
            };
            const marker = new google.maps.Marker({
              position: pos,
              map: map,
              title: 'Hello World!'
            });

            bounds.extend(pos);
          });

        map.fitBounds(bounds);
        this.setState({
            map: map
          });
      } else {
      }

    }
  }

  render(){
    return (
      <div>
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
