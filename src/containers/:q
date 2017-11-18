import React, { Component } from 'react';
import ArtistForm from '../components/ArtistForm';

import ArtistEditForm from '../components/ArtistEditForm';
import artistActions from '../actions/artists';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class ArtistFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      artistQuery: '',
      redirect: false
    }
  }
  componentDidMount() {
    this.findArtists(this.state.artistQuery);
  }
  findArtists = () => {
    this.props.getArtists({name: this.state.artistQuery});
  }
  handleCancel = () => {
    this.setState({
      redirect: true
    })
  }
  render() {
    const redirectTarget = this.props.artist?'/artists/'+this.props.artist.id:'/artists';
    if (this.state.redirect==true){
      return (
        <Redirect to={redirectTarget} />
      )
    }
    else if (this.props.artist) {
      return(
        <ArtistEditForm artist={this.props.artist} onSubmit={this.props.onUpdate} onCancel={this.handleCancel}/>
      )
    } else {
    return(
            <ArtistForm onCancel={this.handleCancel} onSubmit={this.props.onSubmit} artistList={this.props.artists.items}/>
    )
    }
  }
}


var mapStateToProps = function(appState){
  return {
    artists: appState.artists,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onSubmit: function(artist){ dispatch(artistActions.submitNewArtist(artist)); },

    onUpdate: function(id, content){ dispatch(artistActions.submitArtistEdit(id, content)); },
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistFormContainer);
