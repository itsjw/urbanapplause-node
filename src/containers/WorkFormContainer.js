import React, { Component } from 'react';
import WorkForm from '../components/WorkForm';
import workActions from '../actions/works';
import artistActions from '../actions/artists';
import authActions from '../actions/auth';
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
    entry.token = this.props.auth.token;
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
      if (this.props.auth.currently=="LOGGED_IN") {
        return(
            <WorkForm onCancel={this.closeForm} onSubmit={this.handleSubmit} artistList={this.props.artists.items} user_id={this.props.auth.user.id}/>
          )
      } else {
        return (
          <div>
            <span>Log in to add a work<br/></span>
            <button className='button' onClick={this.props.handleSignIn}>Sign In</button>
          </div>
        )
      }
    }
  }
}


var mapStateToProps = function(appState){
  return {
    artists: appState.artists,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onSubmit: function(work){ dispatch(workActions.submitNewWork(work)); },
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); },
    getWorks: function(work){ dispatch(workActions.getWorks()); },
    handleSignIn: function(){ dispatch(authActions.handleSignIn()); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkFormContainer);
