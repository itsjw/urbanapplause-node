import React, { Component } from 'react';
import WorkForm from '../components/WorkForm';
import workActions from '../actions/works';
import artistActions from '../actions/artists';
import {connect} from 'react-redux';

class WorkFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      artistQuery: ''
    }
  }
  componentDidMount() {
    this.findArtists(this.state.artistQuery);
  }
  findArtists = () => {
    this.props.getArtists({name: this.state.artistQuery});
  }
  closeForm = () => {
    this.setState({
      isOpen: false
    })
  }
  openForm = () => {
    this.setState({
      isOpen: true
    })
  }
  render() {
    return(
      <div>
        <button className='button add-new' onClick={this.openForm}>Add New</button>
        <div className={(this.state.isOpen==true)?"modal is-active":"modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <WorkForm onCancel={this.closeForm} onSubmit={this.props.onSubmit} artistList={this.props.artists.items}/>
            </div>
          <button className="modal-close is-large" aria-label="close" onClick={this.closeForm}></button>
        </div>
      </div>
    )
  }
}


var mapStateToProps = function(appState){
  return {
    artists: appState.artists
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onSubmit: function(work){ dispatch(workActions.submitNewWork(work)); },
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkFormContainer);
