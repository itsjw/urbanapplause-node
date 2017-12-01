import React, { Component } from 'react';
import TextInput from '../components/TextInput';
import authActions from '../actions/auth';

import {connect} from 'react-redux';
class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    }
  }
  onInputChange = (fieldName, newValue) => {
    var newState = this.state;
    newState[fieldName] = newValue;
    this.setState({newState});
  }
  handleSubmit = () => {
    var form = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }
    this.props.onLogin(form)
    .then (res = console.log(res));
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <TextInput
          label='Username'
          type='text'
          name='username'
          ref='username'
          value={this.state.username}
          onChange={this.onInputChange}
          icon="user"
        />

      <TextInput
          label='Password'
          type='password'
          name='password'
          ref='password'
          value={this.state.password}
          onChange={this.onInputChange}
          icon="lock"
        />
    <button className={`button is-primary ${(this.props.auth.currently =='loading')?'is-loading':''}`} onClick={this.handleSubmit}>Login</button>

      </div>
    )
  }
}
var mapStateToProps = function(appState){
  return {
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onLogin: function(form){ dispatch(authActions.onLogin(form)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
