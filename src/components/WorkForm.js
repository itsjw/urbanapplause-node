import React, { Component } from 'react';
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput';
import {getUploadsImUrl} from '../services/utils';
import GoogleMap from './GoogleMap';

import cloudinary from 'cloudinary';
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
    console.log('on file change');
    this.setState({
      image: '',
      fileUploadStatus: 'pending'
    })
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target);
      cloudinary.config({
        cloud_name: 'dt69uxouv',
        api_key: '371182578119399',
        api_secret: 'o-EMp3H21ZeD6faMa9TeY1fWUaU'
      });
        cloudinary.uploader.upload(
        e.target.result,
        function(result) {
         console.log(result.url);
          this.setState({
            image: result.url,
            fileUploadStatus: 'complete',
          });
      }.bind(this));
    }.bind(this);
    reader.readAsDataURL(file);
    this.setState({
      isEditingImage: false
    });
   }
  handleSubmit = () => {
    var entry = {
      image: this.state.image,
      description: this.state.description,
      place: this.state.place,
      city_id: this.state.city_id,
      user_id: this.props.user_id
    }
    switch(this.state.artist.action) {
      case null:
        console.log('must select artist option');
        return;
      case 'Unknown':
        entry.anonymous = true;
      case 'New':
        entry.new_artist_name = this.state.artist.value;
      case 'Artist Selected':
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
            imgUrl={this.state.image}
            fileUpload={this.state.fileUploadStatus}
          />

        <SelectInput
            label='Artist'
            options={this.state.options}
            selectOption='Artist Selected'
            createOption='New'
            unknownOption='Unknown'
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
        />
        <div className='field' >
          <div className='label'>
            Location
          </div>

          <GoogleMap
            onLocationChange={this.handleLocationChange}
            searchBoxRef="locationInput"
          />
        </div>
        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default WorkForm;
