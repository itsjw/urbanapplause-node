
import React, { Component } from 'react';
import ArtistProfile from '../components/ArtistProfile';
import artistActions from '../actions/artists';
import {connect} from 'react-redux';

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
export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
