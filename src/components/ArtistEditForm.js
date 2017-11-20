import React, { Component } from 'react';
import TextInput from './TextInput';
import Redirect from 'react-router-dom';

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
    return <Redirect to={`/artist${this.props.artist.id}`} />
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

      <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default ArtistEditForm;
