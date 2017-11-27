
import React, { Component } from 'react';
import Header from '../components/Header';
import userActions from '../actions/users';
import {connect} from 'react-redux';




var mapStateToProps = function(appState){
  return {
    user: appState.users.selectedUser.user,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    submitNewUser: function(content){ dispatch(userActions.submitNewUser(content)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
