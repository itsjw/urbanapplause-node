import React, { Component } from 'react';
import ArtistInfo from './ArtistInfo';
import ArtistFormContainer from '../containers/ArtistFormContainer';
class ArtistProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }
  openEditForm = () => {
    this.setState({
      isEditing: true
    });
  }
  closeEditForm = () => {
    this.setState({
      isEditing: false
    });
  }
  render() {
    return(
      <ArtistInfo artist={this.props.artist}/>
    );
  }
}

export default ArtistProfile;
