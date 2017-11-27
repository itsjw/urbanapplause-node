import React, { Component } from 'react';
import logo from '../../media/ua-logo.png';
import {NavLink, Redirect} from 'react-router-dom';
import {signIn} from '../../services/firebaseAuth';
import {Icon} from 'react-fa';
import userActions from '../../actions/users';
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerActive: false
    }
  }

  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      this.setSignIn(JSON.parse(auth));
    }
  }
  setSignIn = (info) => {
    console.log(info);
    this.setState({
      signedIn: true,
      profile: info.additionalUserInfo.profile,
      credential: info.credential
    });
    localStorage.setItem('auth', JSON.stringify(info));
    this.props.submitNewUser({id: info.user.uid, email: info.user.email});
  }
  handleSignIn = () => {
    signIn(this.setSignIn);
  }
  handleLogOut = () => {
    localStorage.clear();
    this.setState({
      signedIn: false,
      profile: null,
      credentials: null
    });
    return <Redirect to="/"/>;
  }


  toggleHamburger = () => {
    this.setState({
     isHamburgerActive: !this.state.isHamburgerActive,
    });
  }
  render() {
    var authPanel =
      <div className='navbar-end'>
        <a className="navbar-item " onClick={this.handleSignIn}>Sign In</a>
      </div>;
    if (this.state.profile) {
      authPanel =
        <div className='navbar-end'>
            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                <span className="icon">
                    <Icon name="user"/>
                </span>
                {this.state.profile.given_name}
              </a>
              <div className='navbar-dropdown is-boxed'>
                <a className='navbar-item' href='/profile'>
                  <div className='navbar-content'>

                    Profile
                  </div>
                </a>
                <a className='navbar-item' onClick={this.handleLogOut}>
                  <div className='navbar-content'>Logout</div>
                </a>
              </div>
            </div>
        </div>;
    }
    return(
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href='/' className='navbar-item'>
          <img src={logo} style={{marginRight: '10px'}}/>
          {this.props.text}
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
                 <NavLink className='navbar-item' to='/about' activeClassName='is-active'>
                  <div className='navbar-content'>About</div>
                </NavLink>
              </div>
            </div>
          </div>
          {authPanel}
      </div>
    </nav>
    )
  }
}

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

