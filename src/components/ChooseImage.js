import React, { Component } from 'react';
import EXIF from '../services/exif-js/exif.js';
import {getUploadsImUrl} from '../services/utils';
import {getCoord} from '../services/utils';
import cloudinary from 'cloudinary';
import geocoding from 'reverse-geocoding';
import InputStatusTag from './InputStatusTag';


class ChooseImage extends Component {

  getExifData(e, callback) {
    var file = e.target.files[0];
    if (file && file.name) {
      return EXIF.getData(file, function() {
        callback(this.exifdata);
              });
    } else {
      return ("No file provided");
    }
  }
  setPlace = (place) => {
    this.setState({
      place: place
    });
    this.props.onChange('imagePlace', place);
  }
  setExif = (exifdata) => {
    this.props.onChange('imageExif', exifdata);
      const lng = getCoord(exifdata.GPSLongitude, exifdata.GPSLongitudeRef);
    const lat = getCoord(exifdata.GPSLatitude, exifdata.GPSLatitudeRef);
    const setPlace = (place) => {
      this.props.onChange('imagePlace', place);
    }
     geocoding.location({'latitude': lat, 'longitude': lng}, function (err, data){
        setPlace(data.results[0]);
      });
  }
  onClearInput = (fieldName) => {
    this.props.onChange(fieldName, null);
  }

  handleFileChange = (e) => {

    this.props.onChange('imageStatus', 'uploading');
    var file = e.target.files[0];
    this.props.onChange('imageName', file.name);
    //var file = document.querySelector('input[type=file]').files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
      cloudinary.config({
        cloud_name: 'dt69uxouv',
        api_key: '371182578119399',
        api_secret: 'o-EMp3H21ZeD6faMa9TeY1fWUaU'
      });
        cloudinary.uploader.upload(
        e.target.result,
        function(result) {
          this.props.onChange('imagePath', result.url);
          this.props.onChange('imageStatus', 'complete');
      }.bind(this));
    }.bind(this);
    reader.readAsDataURL(file);

    this.getExifData(e, this.setExif);
  }

  clearInput = () => {
    this.props.onChange('imageStatus', null);
    this.props.onChange('imagePath', null);
    this.props.onChange('imageName', null);
    this.props.onChange('imageExif', null);
  }

  render() {
    const {onChange, imagePath, imageStatus} = this.props;
    return(
      <div className='field'>
        <label className='label' htmlFor='photo'>Photo</label>
        <InputStatusTag
          successText={this.props.imageName}
          status={this.props.imageStatus}
          onClear={this.clearInput}/>
        {(imageStatus=='complete')?<div className='file-upload-preview'><img src={imagePath} /></div>:''}
        {(imageStatus=='uploading')?<div className='file-upload-preview'><a className="button is-loading">Loading</a></div>:''}
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="photo" onChange={this.handleFileChange||''}/>
            <span className="file-cta">
              <span className="file-icon">
                <i className="fa fa-upload"></i>
              </span>
              <span className="file-label">
                Choose an image…
              </span>
            </span>
          </label>
        </div>
        {this.props.error?<p className='help is-danger'>{this.props.error.msg}</p>:''}
      </div>
    )
  }
}

export default ChooseImage;
