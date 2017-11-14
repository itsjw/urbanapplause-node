import React, { Component } from 'react';
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput';
import {getUploadsImUrl} from '../services/utils';
import GoogleMap from './GoogleMap';


class WorkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist_id: this.props.artist_id || null,
      description: this.props.description ||'',
      image: this.props.image || '',
      city_id: 2,
      fileUploadStatus: (this.props.image?'complete':null),
      errors: {},
      place: null,
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two', clearableValue: false }
      ]
    }
  }
  onSelectArtist = (action, value) => {
    this.setState({
      artist: {
        action: action,
        value: value
      }
    });

  }
  handleLocationChange = (place) => {
    console.log(place);
    this.setState({
      place: place
    });
  }
  onInputChange = (fieldName, newValue) => {
    var newState = this.state;
    newState[fieldName] = newValue;
    this.setState({newState});
  }
   onFileChange = (e) => {
    this.setState({
      image: '',
      fileUploadStatus: 'pending'
    })
    var file = document.querySelector('input[type=file]').files[0];
    getUploadsImUrl(file).then((url) => {
      var errors = this.state.errors;
      errors.fileUpload = false;
      this.setState({
        image: url,
        fileUploadStatus: 'complete',
        errors: errors
      });
    });
    var reader  = new FileReader();
    reader.addEventListener("load", function () {

    }, false)
  this.setState({
    isEditingImage: false
  });
   }
  handleSubmit = () => {
    var entry = {
      image: this.state.image,
      description: this.state.description,
      place: this.state.place,
      city_id: this.state.city_id
    }
    switch(this.state.artist.action) {
      case null:
        console.log('must select artist option');
        return;
      case 'leave':
        entry.anonymous = true;
      case 'create':
        entry.new_artist_name = this.state.artist.value;
      case 'select':
        entry.artist_id = this.state.artist.value;
    }
    console.log(entry);
    this.props.onSubmit(entry);
    this.props.onCancel();
    this.forceUpdate();
  }
  a
  render() {
    return (
      <div>
        <h1>Adding new work</h1>
         <FileInput
            className='file-input'
            type='file'
            refName='photoFile'
            title='Choose an image'
            label="Choose a photo..."
            onChange={this.onFileChange}
            errorMsg={this.state.errors.file}
            imgUrl={this.state.image}
            fileUpload={this.state.fileUploadStatus}
          />

        <SelectInput
            label='Artist'
            options={this.state.options}
            errorText=''
            selectOption='select'
            createOption='create'
            unknownOption='leave'
            value={this.state.artistInput}
            onSelectMatch={this.onInputChange}
            setValue={this.onSelectArtist}
            placeholder='Start typing to find artists...'
            onCreateNew={this.onCreateNewArtist}
            options={this.props.artistList}
          />

        <TextInput
          label='Description'
          type='text'
          name='description'
          ref='description'
          value={this.state.description}
          onChange={this.onInputChange}
          errorMsg={this.state.errors.description}
        />
        Location:
        <GoogleMap
          onLocationChange={this.handleLocationChange}
        />
        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default WorkForm;
