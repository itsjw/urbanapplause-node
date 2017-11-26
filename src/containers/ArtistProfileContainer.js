import React, { Component } from 'react';
import ArtistInfo from '../components/ArtistInfo';

import ArtistEditForm from '../components/ArtistEditForm';
import artistActions from '../actions/artists';
import {connect} from 'react-redux';

class ArtistProfileContainer  extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    }
  }
  componentDidMount(){
    this.props.getArtist(this.props.match.params.id);
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
  handleUpdate = (id, content) => {
    this.props.onUpdate(id, content);
  }
  render() {
    const id = this.props.match.params.id;
    if (this.state.isEditing) {
      return(
        <div>
          <ArtistEditForm artist={this.props.artist} onSubmit={this.handleUpdate} onCancel={this.closeForm}/>
        </div>);
    } else {
      return (
        <div>
          <ArtistInfo artist={this.props.artist}/>
          <button className='button' onClick={this.openForm}>Edit</button>
        </div>
      )
    }
  }
}

var mapStateToProps = function(appState){
  return {
    artist: appState.artists.selectedArtist.artist,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getArtist: function(id){ dispatch(artistActions.findById(id)); },
    getWorks: function(artist_id) {dispatch(workActions.findWorksForArtist(artist_id));},
    onUpdate: function(id, content){ dispatch(artistActions.submitArtistEdit(id, content)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfileContainer);
