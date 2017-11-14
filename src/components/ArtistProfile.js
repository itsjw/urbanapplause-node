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
  componentDidMount() {
    this.props.getArtist(this.props.id)
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
    if (this.props.artist) {
      const {artist} = this.props;
      if (this.state.isEditing == true) {
        return (<ArtistFormContainer type='editing' artist={artist} onCancel={this.closeEditForm} />);
      } else {
        return(
          <div>
            <ArtistInfo artist={artist}/>
            <button className='button is-success' onClick={this.openEditForm}>Edit</button>
          </div>
        )
      }
    } else {
      return (<span>Loading</span>);
    }
  }
}

export default ArtistProfile;
