import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Footer from './Footer'

const wrapper = shallow(Footer)

describe('Footer Component', () => {

  it('renders h1', () => {
    expect(wrapper.find('a').text()).toEqual('About')
  })

  it('renders p', () => {
    expect(wrapper.find('p').text()).toEqual('Welcome to my world')
  })
})
