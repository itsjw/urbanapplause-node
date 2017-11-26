import React, { Component } from 'react';
import logo from '../../media/ua-logo.png';

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
                <a className='navbar-item' href='/works'>
                  <div className='navbar-content'>Works</div>
                </a>
                 <a className='navbar-item' href='/artists'>
                   <div className='navbar-content'><p className='has-text-link'>Artists</p></div>
                </a>
                 <a className='navbar-item' href='/about'>
                  <div className='navbar-content'>About</div>
                </a>

              </div>
            </div>
          </div>

        </div>
      </nav>
    )
  }
}

export default Header;
