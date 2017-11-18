import React, { Component } from 'react';
import ArtistProfile from '../components/ArtistProfile';
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
    console.log(this.props.artist);
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
        <ArtistProfile artist={this.props.artist}/>
      </div>
    )
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
    getWorks: function(artist_id) {dispatch(workActions.findWorksForArtist(artist_id));}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfileContainer);
