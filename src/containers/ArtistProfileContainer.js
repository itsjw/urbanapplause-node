import React, { Component } from 'react';
import ArtistInfo from '../components/ArtistInfo';

import ArtistEditForm from '../components/ArtistEditForm';
import artistActions from '../actions/artists';
import workActions from '../actions/works';
import WorkList from '../components/WorkList';
import {connect} from 'react-redux';

class ArtistProfileContainer  extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    }
  }
  componentDidMount(){
    const artist_id = this.props.match.params.id;
    this.props.getArtist(artist_id);
    this.props.getWorks(artist_id);
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
          <h3 className='title is-3'>Works by {this.props.artist.name}</h3>
          {(this.props.works.items.length>0)?<WorkList works={this.props.works.items} total={this.props.works.total} onDeleteWork={this.props.deleteWork} />:"No works posted for this artist"}
        </div>
      )
    }
  }
}

var mapStateToProps = function(appState){
  return {
    artist: appState.artists.selectedArtist.artist,
    works: appState.works,
  }
}
var mapDispatchToProps = function(dispatch){
  return {

    getArtist: function(id){ dispatch(artistActions.findById(id)); },
    getWorks: function(artist_id) {dispatch(workActions.getWorks({artist_id: artist_id}));},

    deleteWork: function(work_id) {dispatch(workActions.deleteWork(work_id));},
    onUpdate: function(id, content){ dispatch(artistActions.submitArtistEdit(id, content)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfileContainer);
