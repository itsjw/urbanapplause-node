import React, { Component } from 'react';
import workActions from '../actions/works';
import artistActions from '../actions/artists';
import authActions from '../actions/auth';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import WorkForm from '../components/WorkForm';
import Modal from '../components/Modal';
import ChooseImage from '../components/ChooseImage';
import ChooseArtist from '../components/ChooseArtist';
import ChooseDate from '../components/ChooseDate';
import ChooseLocation from '../components/ChooseLocation';
import TextInput from '../components/TextInput';
import moment from 'moment';

class WorkFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalMsg: "",
      artistInputType: 'select',
      artistName: '',
      artistId: null,
      imageName: null,
      imagePath: null,
      imageExif: null,
      imageStatus: null,
      date: new Date(),
      place: null,
      description: '',
    }
  }

  componentDidMount() {
    this.findArtists(this.state.artistName);
  }

  findArtists = () => {
    this.props.getArtists({name: this.state.artistName});
  }
  onInputChange = (fieldName, newValue) => {
    console.log(fieldName, newValue);
    if(fieldName=="imagePlace" && newValue) {
      var address = newValue.formatted_address
      this.setState({
        showModal: true,
        modalMessage: `Looks like this photo was taken at ${address}. Do you want to use this address to fill in the location field?`,
        imagePlace: newValue
      });
    } else {
      var newState = this.state;
      newState[fieldName] = newValue;
      this.setState(newState, function(){console.log(newState) });
    }
  }
  handleModalRespond = (e) => {
    var response = e.target.value;
    if (response == 'Yes') {
      this.setState({
        showModal: false,
        place: this.state.imagePlace
      });
    } else {
      return;
    }
  }

  handleSubmit = () => {
    if (this.state.imageStatus=='loading'){
      alert('Please wait for your image to finish loading!');
    } else {
      var entry = {
        artist_id: this.state.artistId,
        new_artist_name: this.state.artistName,
        image: this.state.imagePath,
        description: this.state.description,
        place: this.state.place,
        user_id: this.props.auth.user.id
      }
      entry.token = this.props.auth.token;
      this.props.onSubmit(entry);
    }
  }
  render() {
    return(
      <div>
        {this.state.showModal==true?<Modal message={this.state.modalMessage} options={["Yes", "No"]} onRespond={this.handleModalRespond}/>:''}
        {Object.keys(this.props.works.newWorkErrors).length>0 ?(
        <article className='message is-danger'>
          <div className='message-body'>
            There were some problems with your sumission
          </div>
        </article>):''}
        <ChooseImage
          imagePath={this.state.imagePath}
          imageStatus={this.state.imageStatus}
          onChange={this.onInputChange}
          imageName={this.state.imageName}
          onClear={this.onInputClear}
          error={this.props.works.newWorkErrors.image}
        />
        <ChooseDate
          date={this.state.date}
          onChange={this.onInputChange}
          onClear={this.onInputClear} />

        <ChooseLocation
          place={this.state.place}
          onChange={this.onInputChange}
        />

        <ChooseArtist
          artistInputType={this.state.artistInputType}
          artistName={this.state.artistName}
          artistId={this.state.artistId}
          artistOptions={tempArtistOptions}
          onChange={this.onInputChange}
        />

        <TextInput
          label='Description'
          type='text'
          name='description'
          ref='description'
          value={this.state.description}
          onChange={this.onInputChange}
        />

        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
        <button className='button' onClick={this.handleCancel}>Cancel</button>
      </div>
    )
  }
}

var mapStateToProps = function(appState){
  return {
    works: appState.works,
    artists: appState.artists,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onSubmit: function(work){ dispatch(workActions.submitNewWork(work)); },
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkFormContainer);

const tempArtistOptions = [
  {
    id: 1,
    name: 'bobby'
  },
 {
    id: 2,
    name: 'cathy'
  },

 {
    id: 3,
    name: 'odette'
  },

 {
    id: 4,
    name: 'wendell'
  },

 {
    id: 5,
    name: 'mick'
 }
];


