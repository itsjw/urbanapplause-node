
import React, { Component } from 'react';
import logo from '../media/ua-logo.png';
import {NavLink, Redirect} from 'react-router-dom';
import {Icon} from 'react-fa';
import authActions from '../actions/auth';
import {connect} from 'react-redux';

import AuthPanel from '../components/AuthPanel';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerActive: false,
      redirect: null
    }
  }

  componentDidMount() {
    this.props.checkLocalAuthState();
  }

  toggleHamburger = () => {
    this.setState({
     isHamburgerActive: !this.state.isHamburgerActive
    });
  }
  handleLogout = () => {
    this.setState({
      redirect: "/",
    });
    this.props.onLogout();
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }
    else {
    return(
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href='/' className='navbar-item'>
          <img src={logo} style={{marginRight: '10px'}}/>
         Urban Applause
        </a>

          <button onClick={this.toggleHamburger} className={this.state.isHamburgerActive?"button navbar-burger is-active":"button navbar-burger"}>
            <span></span>
            <span></span>
            <span></span>
          </button>
      </div>

      <div className={this.state.isHamburgerActive?'navbar-menu is-active':'navbar-menu'}>
          <div className='navbar-start'>
            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'></a>
              <div className='navbar-dropdown is-boxed'>
                <NavLink className='navbar-item' to='/works' activeClassName='is-active'>
                  <div className='navbar-content'>Works</div>
                </NavLink>
                 <NavLink className='navbar-item' to='/artists' activeClassName='is-active'>
                   <div className='navbar-content'>Artists</div>
                </NavLink>
                 <NavLink className='navbar-item' to='/users' activeClassName='is-active'>
                  <div className='navbar-content'>Users</div>
                </NavLink>
              </div>
            </div>
          </div>
          <AuthPanel
            isLoggedIn={(this.props.auth.currently=='LOGGED_IN')?true:false}
            onLogOut={this.handleLogout}
            signInRoute="/signin"
            registerRoute="/register"
            username={this.props.auth.user.username}
            uid={this.props.auth.user.id}
          />
        </div>
    </nav>
    )
    }
  }
}

var mapStateToProps = function(appState){
  return {
    auth: appState.auth,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onLogout: function(){ dispatch(authActions.onLogout()); },
    checkLocalAuthState: function(){ dispatch(authActions.checkLocalAuthState()); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

