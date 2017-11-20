import React, { Component } from 'react';
import TextInput from './TextInput';


class ArtistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      errors: {},
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
      city_id: 2
    }
    this.props.onSubmit(entry);
    this.props.onCancel();
    this.forceUpdate();
  }

  render() {
    return (
      <div>

        <TextInput
          label='Name'
          type='text'
          ref='name'
          name='name'
          value={this.state.name}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.description}
        />

        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default ArtistForm;
