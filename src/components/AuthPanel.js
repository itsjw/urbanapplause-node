import React, { Component } from 'react';
import {Icon} from 'react-fa';

class AuthPanel extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isLoggedin != nextProps.isLoggedIn ){
      console.log('should update');
      this.forceUpdate();
      return true;
    }
    return false;
  }
  render() {
    if (this.props.isLoggedIn==true) {
      return(
        <div className='navbar-end'>
            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                <span className="icon">
                    <Icon name="user"/>
                </span>
                {this.props.username}
              </a>
              <div className='navbar-dropdown is-boxed'>
                <a className='navbar-item' href={`/users/${this.props.uid}`}>
                  <div className='navbar-content'>

                    Profile
                  </div>
                </a>
                <a className='navbar-item' onClick={this.props.onLogOut}>
                  <div className='navbar-content'>Logout</div>
                </a>
              </div>
            </div>
        </div>
      )
    } else {
      return (
      <div className='navbar-end'>
        <a className="navbar-item " onClick={this.props.onSignIn}>Sign In</a>
      </div>
      )
    }
  }
}

export default AuthPanel;
