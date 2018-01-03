import React, { Component } from 'react';
import TextInput from '../components/TextInput';
import authActions from '../actions/auth';
import {connect} from 'react-redux';
import {Icon} from 'react-fa';

class RegisterContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {
        email: null,
        password: null,
        username: null,
        password2: null
      }
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
      password2: this.state.password2,
    }

    this.props.onRegister(form);
  }
  render() {
    const errors = this.props.auth.registrationErrors;
    var errorDict = {}
    if (errors) {
      Object.keys(errors).map((key) => {
        let field = errors[key].param;
        let msg = errors[key].msg;
        errorDict[field] = msg;
      })
    }
    return(
      <div className='control'>
        {(this.props.auth.registrationStatus=='failure')?
            <div className="message is-danger">
              <div className="message-body">
                Failed to register. You are missing some of the required fields.
              </div>
            </div>:''}

        <TextInput
          label='Email'
          type='text'
          name='email'
          ref='email'
          value={this.state.email}
          onChange={this.onInputChange}
          errorMsg={errorDict.email||''}
          icon="envelope"
        />
      <TextInput
          label='Username'
          type='text'
          name='username'
          ref='username'
          value={this.state.username}
          onChange={this.onInputChange}
          errorMsg={errorDict.username||''}
          icon="user"
        />

      <TextInput
          label='Password'
          type='password'
          name='password'
          ref='password'
          value={this.state.password}
          onChange={this.onInputChange}
          errorMsg={errorDict.password||''}
          icon="lock"
        />

      <TextInput
          label='Confirm Password'
          type='password'
          name='password2'
          ref='password2'
          value={this.state.password2}
          onChange={this.onInputChange}
          errorMsg={errorDict.password2||''}
          icon="lock"
        />
        <button className={`button is-primary ${(this.props.auth.registrationStatus=='loading')?'is-loading':''}`} onClick={this.handleSubmit}>Register</button>
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
    onRegister: function(form){ dispatch(authActions.onRegister(form)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
