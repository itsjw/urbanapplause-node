import React, { Component } from 'react';
import GoogleMapSingle from '../components/GoogleMap2';

class Playground extends Component {
  constructor(props){
    super(props);
    this.state = {
      place: null
    }
  }
  handleLocationChange = (place) => {
    this.setState({
      place: place
    });
  }
  render() {
    return(
      <div>
        <h1>Playground</h1>
        <h2>Google Map</h2>
        <p>Selected Location: {this.state.place?this.state.place.formatted_address:'None selected'}</p>
        <GoogleMapSingle
          onChange={this.handleLocationChange}
          />
      </div>
    )
  }
}

export default Playground;
