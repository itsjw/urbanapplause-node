import React, { Component } from 'react';

class ArtistProfile extends Component {
  componentWillUnmount() {
  }
  componentDidMount() {
    this.props.getArtist(this.props.id)
  }
  render() {
    if (this.props.artist) {
      const {artist} = this.props;
    return(
      <div>
        <h1>{this.props.artist.name}</h1>
        <h3>Home City</h3>
        <p>{artist.city}</p>
        <h3>Bio</h3>
        <p>{this.props.artist.bio}</p>
        <h3>Experience</h3>
        <p>{this.props.artist.experience}</p>
        <h3>Website</h3>
        <p><a href={artist.website}>{artist.website}</a></p>
        <h3>Email</h3>
        <p>{artist.email}</p>
      </div>
      )
    } else {
      return (<span>Loading</span>);
    }
  }
}

export default ArtistProfile;
