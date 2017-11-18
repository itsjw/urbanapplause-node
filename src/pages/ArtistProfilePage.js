import React, { Component } from 'react';
import ArtistProfileContainer from '../containers/ArtistProfileContainer';
import ArtistFormContainer from '../containers/ArtistFormContainer';

class ArtistProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    }
  }
  closeForm = () => {
    this.setState({
      isEditing: false
    });
  }

  openForm = () => {
    this.setState({
      isEditing: true
    });
  }
  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <ArtistProfileContainer id={id}/>
      </div>
    )
  }
}

export default ArtistProfilePage;
