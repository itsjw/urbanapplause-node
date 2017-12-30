import React, { Component } from 'react';
import workActions from '../actions/works';
import {connect} from 'react-redux';
import EXIF from '../services/exif-js/exif.js';

import geocoding from 'reverse-geocoding';
import artistActions from '../actions/artists';
import ChooseArtist from '../components/ChooseArtist';
import TextInput from '../components/TextInput';
import C from '../constants.js';

function getCoord(number, ref) {
    var l = number[0].numerator + number[1].numerator /
      (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    if (ref == 'W'|'S') {
      return l*(-1)
    } else {
      return l
    }
}


const tempFiles = [
  {filename: "photos_1514512079788_Confluence.jpg"},
  {filename: "photos_1514512201323_IMG_5263.JPG"},
  {filename: "photos_1514512511436_Confluence.jpg"}
]

class BulkEditContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      newWorks: []
    }
  }
  newWorkToState = (i, newWork) => {
    console.log('work with exif', newWork);
    var newWorks = this.state.newWorks;
    newWorks.push( newWork );
    console.log(newWorks);
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
      const exifPlace = new Promise(function(resolve, reject){
      geocoding.location({'latitude': lat, 'longitude': lng}, function (err, data){
        if(err){
            reject(err);
        }else{
          resolve(data.results[0]);
        }
      });
      }).then((result) => {
        onInputChange('place', result);
        return result;
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
        artistId: null,
        artistName: '',
        date: new Date(),
        file: this.props.works.newfiles.item(i),
        place: {formatted_address: "199 howland ave, toronto"},
        description: ''
      }
      this.getWorkExif(i, newWork);
    });
  }

  onInputChange = (index, fieldName, newValue) => {
    var newWorks = this.state.newWorks;
    newWorks[index][fieldName] = newValue;
    this.setState({
      newWorks: newWorks
    });
    console.log(index, newWorks[index]);
  }

  componentWillReceiveProps(){
    this.setNewWorks(this.props);
  }
  componentWillUpdate(nextProps, nextState){
    if (nextProps != this.props) {
      this.setNewWorks(nextProps);
    }
  }
  handleSubmit = () => {
    this.state.newWorks = ((newWork, i) => {
    });
    var entry = {
      image: newWork.imageFilename,
      description: newWork.description,
      place: newWork.place,
      user_id: this.props.auth.user_id,
      artist_id: newWork.artistId,
      artist_name: newWork.artistName
    }
    if (this.state.artist ==null) {
      alert('Please select a valid option for the artist field');
      return;
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
    return(
      <div>
        <h1>Edit photos</h1>
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
                value={this.state.description||''}
                onChange={(fieldName, value) =>{this.onInputChange(i, fieldName, value)}}
              />


            </div>
            <hr />
          </div>
          )
        })}
                <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

var mapStateToProps = function(appState){
  return {
    works: appState.works,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    onSubmit: function(work){ dispatch(workActions.submitNewWork(work)); },
    getArtists: function(query){ dispatch(artistActions.getArtists(query)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkEditContainer);

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
