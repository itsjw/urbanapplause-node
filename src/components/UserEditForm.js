import React, { Component } from 'react';
import TextInput from './TextInput';
import Redirect from 'react-router-dom';

class UserEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name||'',
      bio: this.props.user.bio ||'',
      experience: this.props.user.experience||'',
      website: this.props.user.website||'',
      email: this.props.user.email||'',
      errors: {}
    }
  }
  onInputChange = (fieldName, newValue) => {
    var newState = this.state;
    newState[fieldName] = newValue;
    this.setState({newState});
  }

  handleSubmit = () => {
    var entry = {
      name: this.state.name,
      bio: this.state.bio,
      experience: this.state.experience,
      website: this.state.website,
      email: this.state.email
    }
    this.props.onSubmit(this.props.user.id, entry);
    this.props.onCancel();
  }

  render() {
    const user = this.state;
    return (
      <div>

        <TextInput
          label='Name'
          type='text'
          ref='name'
          name='name'
          value={user.name}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.description}
        />
       <TextInput
          label='Bio'
          type='textarea'
          ref='bio'
          name='bio'
          value={user.bio}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.description}
        />

      <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default UserEditForm;
