import React, { Component } from 'react';
import TextInput from './TextInput';


class ArtistEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.artist.name||'',
      bio: this.props.artist.bio ||'',
      experience: this.props.artist.experience||'',
      website: this.props.artist.website||'',
      email: this.props.artist.email||'',
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
    console.log(entry);
    this.props.onSubmit(this.props.artist.id, entry);
    this.props.onCancel();
  }

  render() {
    const artist = this.state;
    return (
      <div>

        <TextInput
          label='Name'
          type='text'
          ref='name'
          name='name'
          value={artist.name}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.description}
        />
       <TextInput
          label='Bio'
          type='textarea'
          ref='bio'
          name='bio'
          value={artist.bio}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.description}
        />

       <TextInput
          label='Experience'
          type='textarea'
          ref='experience'
          name='experience'
          value={artist.experience}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.experience}
        />
      <TextInput
          label='Website'
          type='text'
          ref='website'
          name='website'
          value={artist.website}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.website}
        />

       <TextInput
          label='Email'
          type='text'
          ref='email'
          name='email'
          value={artist.email}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.email}
        />


        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default ArtistEditForm;
