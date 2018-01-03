import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import geocoding from 'reverse-geocoding';

import workActions from '../actions/works';
import artistActions from '../actions/artists';

import EXIF from '../services/exif-js/exif.js';
import {getCoord, reverseGeocode} from '../services/location';
import C from '../constants.js';
import tempArtistOptions from '../testData/artists';

import ChooseArtist from '../components/ChooseArtist';
import TextInput from '../components/TextInput';

class BulkEditContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      newWorks: [],
      status: 'loading',
      redirect: false
    }
  }
  componentDidMount() {
    if(!this.props.works.newfiles) {
      this.setState({
        redirect: '/works/bulk-add'
      });
    }
  }
  newWorkToState = (i, newWork) => {
    var newWorks = this.state.newWorks;
    newWorks.push( newWork );
    this.setState({
      newWorks: newWorks
    });
  }
  getWorkExif = (i, newWork) => {
    var setState = this.newWorkToState;
    var onInputChange = (fieldName, value) => {this.onInputChange(i, fieldName, value)};
    return EXIF.getData(newWork.file, function(i){
      const lng = getCoord(this.exifdata.GPSLongitude, this.exifdata.GPSLongitudeRef);
      const lat = getCoord(this.exifdata.GPSLatitude, this.exifdata.GPSLatitudeRef);
      var exifPlace = reverseGeocode(lat, lng).then((data) => ( JSON.parse(data)))
        .then((json) => {
        onInputChange('place', json.results[0]);
        console.log(json.results);
        return json.results[0];
      });

      const exifWork = Object.assign({}, newWork, {imageExif: this.exifdata, place: exifPlace, date: this.exifdata.DateTime});

      setState(i, exifWork);
    })
  }
  setNewWorks = (props) => {
    props.works.newimages.map((image, i) => {
      var newWork = {
        imageFilename: image.filename,
        artistInputType: 'unknown',
        artistId: 0,
        artistName: '',
        date: new Date(),
        file: this.props.works.newfiles.item(i),
        place: {formatted_address: "199 howland ave, toronto"},
        description: ''
      }
      this.getWorkExif(i, newWork);
    });
    this.setState({
      status: 'complete'
    });
  }
  onInputChange = (index, fieldName, newValue) => {
    var newWorks = this.state.newWorks;
    newWorks[index][fieldName] = newValue;
    this.setState({
      newWorks: newWorks
    });
  }
  componentWillUpdate(nextProps, nextState){
    if ((nextProps.works.newfiles != this.props.works.newfiles) || (nextProps.works.newimages != this.props.works.newimages)) {
      if (nextProps.works.newimages.length > 0 ){
        this.setState({
          status: 'loading'
        });
        this.setNewWorks(nextProps);
      } else {
        this.setState({
          redirect: '/works/bulk-add'
        });
      }
    }
  }
  handleSubmit = () => {
    this.state.newWorks.map((newWork, i) => {
      var entry = {
        image: newWork.imageFilename,
        description: newWork.description,
        place: newWork.place,
        user_id: this.props.auth.user.id,
        artist_id: newWork.artistId,
        new_artist_name: newWork.artistName
      }
      entry.token = this.props.auth.token;
      this.props.submitNewWork(entry);
    });
    this.setState({
        redirect: '/works'
      });
  }
  onCancel = () => {
    this.setState({
      redirect: '/works'
    })
  }
  chooseDifferentImages = () => {
   this.setState({
      redirect: '/works/bulk-add'
    })

  }
  render() {
    if (this.state.redirect != false) {
      return (
        <Redirect to={this.state.redirect} />
      )
    }

    return(
      <div>
        {this.state.status=='loading'?'Loading images...':''}
        {this.state.newWorks.map((work, i) => {
          const newWork = this.state.newWorks[i];
          return (
            <div key={i} className='columns'>
              <div className='column'>
                <img src={`${C.SERVER_URL}/${C.UPLOADS_SUBPATH}/${work.imageFilename}`} style={{width: '300px'}} key={i}/>
              </div>

              <div className='column'>
                <ChooseArtist
                  key={i}
                  artistInputType={newWork.artistInputType}
                  artistName={newWork.artistName}
                  artistId={newWork.artistId}
                  artistOptions={tempArtistOptions}
                  onChange={(fieldName, value) =>{this.onInputChange(i, fieldName, value)}}
                />
                <label className='label' htmlFor='place'>Location</label>
                <span className='' name='place'>
                  {newWork.place?<span>{newWork.place.formatted_address}</span>:"loading exxif data"}
                </span>
                <label className='label' >Photo taken on:
                </label>

                {newWork.date?<span>{newWork.date}</span>:"loading exxif data"}<br/>
              <TextInput
                label='Description'
                type='text'
                name='description'
                ref='description'
                value={newWork.description}
                onChange={(fieldName, value) =>{this.onInputChange(i, fieldName, value)}}
              />
            </div>
            <hr />
          </div>
          )
        })}
        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>

        <button className='button' onClick={this.chooseDifferentImages}>Choose different images</button>
        <button className='button' onClick={this.onCancel}> Cancel</button>
      </div>
    )
  }
}

var mapStateToProps = function(appState){
  return {
    works: appState.works,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    submitNewWork: function(work){ dispatch(workActions.submitNewWork(work)); },
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkEditContainer);


