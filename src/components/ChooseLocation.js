import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import InputStatusTag from './InputStatusTag';

class ChooseLocation extends Component {
  handleLocationChange = (place) => {
    this.props.onChange('place', place);
  }
  handleClear = () => {
    this.props.onChange('place', null);
  }
  render() {
    return(
      <div>
        <label htmlFor='location' className='label'>Location</label>
        <InputStatusTag
          successText={this.props.place?this.props.place.formatted_address:''}
          onClear={this.handleClear}
          status={this.props.place?'complete':null} />
        <GoogleMap
          onLocationChange={this.handleLocationChange}
          place={this.props.place}
          onError={()=>{}}/>

      </div>
    )
  }
}

export default ChooseLocation;
