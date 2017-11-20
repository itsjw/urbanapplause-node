import React, { Component } from 'react';
import WorkForm from '../components/WorkForm';
import workActions from '../actions/works';
import artistActions from '../actions/artists';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class WorkFormContainer extends Component {
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
  handleSubmit = (entry) => {
    this.props.onSubmit(entry);
    this.setState({
      redirect: true
    });
  }
  closeForm = () => {
    this.setState({
      redirect: true
    });
  }
  render() {
    if (this.state.redirect==true) {
      return (
        <Redirect to='/works'/>
      )
    } else {
      return(
          <WorkForm onCancel={this.closeForm} onSubmit={this.handleSubmit} artistList={this.props.artists.items}/>
      )
    }
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
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); },
    getWorks: function(work){ dispatch(workActions.getWorks()); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkFormContainer);
