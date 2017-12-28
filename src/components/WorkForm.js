import React, { Component } from 'react';
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput';
import GoogleMap from './GoogleMap';



class WorkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist_input_type: 'select',
      artist_id: this.props.artist_id || null,
      description: this.props.description ||'',
      image: this.props.image || '',
      imageData: null,
      city_id: 2,
      fileUploadStatus: null,
      errors: {},
      place: null,
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
    this.setState({
      place: place
    });
  }
  onInputChange = (fieldName, newValue) => {
    var newState = this.state;
    newState[fieldName] = newValue;
    this.setState({newState});
  }


   handleSubmit = () => {
    var entry = {
      image: this.state.image,
      description: this.state.description,
      place: this.state.place,
      city_id: this.state.city_id,
      user_id: this.props.user_id
    }
    if (this.state.artist ==null) {
      alert('Please select a valid option for the artist field');
      return;
    }
    switch(this.state.artist.action) {
      case null:
        return;
      case 'Unknown':
        entry.anonymous = true;
      case 'New':
        entry.new_artist_name = this.state.artist.value;
      case 'Artist Selected':
        entry.artist_id = this.state.artist.value;
    }
    if (entry.place==null) {
      alert('Please choose a location for this work');
      return;
    }
    console.log(entry);
    this.props.onSubmit(entry);
    this.props.onCancel();
    this.forceUpdate();
  }
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
            onImageChange={this.onInputChange}
            imgUrl={this.state.image}
            fileUploadStatus={this.state.fileUploadStatus}
          />

        <label className='label'>Artist</label>
        <span className='tag is-success'>Aritst Unknown</span>
        {this.state.artistInputType=='unknown'?(
          <div><span onClick={(() => (this.setState({artistInputType: 'select'})))}>X</span></div>
        )
            :(
              <div>
        <SelectInput
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
        <button className='button' onClick={((e)=>this.setState({artistInputType: 'unknown'}))}>I dont know the artist</button>
        </div>)}

        <TextInput
          label='Description'
          type='text'
          name='description'
          ref='description'
          value={this.state.description}
          onChange={this.onInputChange}
        />

        <div className='field' >
          <label className='label'>
            Location<br/>
            {this.state.place?
              (<span className='tag is-success'>
                {this.state.place.formatted_address}
              </span>):
              <span className='tag is-danger'>No location selected.</span>
            }
          </label>

          <GoogleMap
            onLocationChange={this.handleLocationChange}
            searchBoxRef="locationInput"
            place={this.state.place}
          />
        </div>
        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.props.onCancel}>Cancel</button>
      </div>
        )
  }
}

export default WorkForm;
