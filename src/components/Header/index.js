import React, { Component } from 'react';
import logo from '../../media/ua-logo.png';
import {NavLink} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerActive: false
    }
  }
  toggleHamburger = () => {
    this.setState({
     isHamburgerActive: !this.state.isHamburgerActive,
    });
  }
  render() {
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
                   <div className='navbar-content'><p className='has-text-link'>Artists</p></div>
                </NavLink>
                 <NavLink className='navbar-item' to='/about' activeClassName='is-active'>
                  <div className='navbar-content'>About</div>
                </NavLink>

              </div>
            </div>
          </div>

        </div>
      </nav>
    )
  }
}

export default Header;
