import React, { Component } from 'react';

class ArtistInfo extends Component {

  render() {
    if (this.props.artist) {
      const {artist} = this.props;
    return(
      <div>
        <h1>{this.props.artist.name}</h1>
        <h3>Bio</h3>
        <p>{this.props.artist.bio}</p>
      </div>
      )
    } else {
      return (<span>Loading</span>);
    }
  }
}

export default ArtistInfo;
