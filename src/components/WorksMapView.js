import React from 'react'
import scriptLoader from 'react-async-script-loader'
import {timeSince} from '../services/utils';

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      map: null
    };
  }
  componentDidUpdate(prevProps, prevState) {

   if (prevProps.works!== this.props.works) {

   this.loadMap();

   this.forceUpdate()

   }

  }
  loadMap() {
      var map  = new google.maps.Map(this.refs.map, {
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
            var contentString = `
              <div className='map-popup'>
                <h2 className='title is-6'>
                  ${work.artist}
                </h2>
                                <h3 className='subtitle is-7'>${work.formatted_address}</h3>
              <p>
                  Posted ${timeSince(new Date(work.date_posted))} ago
                </p>


                <div
                  className='thumbnail-container'>
                  <img style="width: 200px;" className='image' src='${work.image}'/></div>
                              </div>`;

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });


            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
            bounds.extend(pos);
          });

    map.fitBounds(bounds);
    map.setZoom(12);
        this.setState({
            map: map
          });

  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.loadMap();
        } else {
      }

    }
  }

  render(){
    return (
      <div>
        <div ref="map" style={{width: '100%', zIndex: '10', height: '400px'}}></div>
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
