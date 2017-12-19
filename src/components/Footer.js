import React, { Component } from 'react';
import {Icon} from 'react-fa';
import HelloWorld from './HelloWorld';

class Footer extends Component {
  render() {
    return(
      <div className='footer'>
        <div className='wrapper'>
          <div className='text-centered-wrapper' style={{textAlign: 'middle'}}>
            <div className='content has-text-centered'>
              <p>
              <a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/contact'>Contact</a>

              <br/>Urban Applause &copy;2017<br/>
              </p>

              <span className='icon is-medium'><a className='social-link' href='https://github.com/flannerykj/urbanapplause-node' target='_blank'><Icon name='github' size='2x'/></a></span><br/>
            </div>
            <HelloWorld/>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
