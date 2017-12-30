import React, { Component } from 'react';
import FileInput from '../components/FileInput';
import EXIF from '../services/exif-js/exif.js';
import {getUploadsImUrl} from '../services/utils';
import cloudinary from 'cloudinary';
import geocoding from 'reverse-geocoding';
import workActions from '../actions/works';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import C from '../constants';
import { withRouter } from 'react-router-dom'

import {AJAXSubmit} from '../services/request/uploadFiles';


class BulkPostContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      localFiles: [],
      fileLoaded: false
    }
  }
  handleSelectImages = (e) => {
    var files = e.target.files;
    this.props.setNewFiles(files);
    var fileArray = [];
    for (var i = 0; i < files.length; i++) {
      fileArray.push(files.item(i));
    }
    this.setState({
      localFiles: fileArray,
      e: e,
      filesLoaded: true
    });
  }
  readAndPreview = (file) => {
    var preview = document.querySelector('#preview');
    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        preview.appendChild( image );
      }, false);
      reader.readAsDataURL(file);
    }
  }
  uploadImages = (e) => {
    e.preventDefault();
    this.props.uploadFiles(e.target[0].files);
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = this.refs.frmUploader;
    this.props.uploadFiles(formData, `${C.SERVER_URL}/api/upload` );
    this.props.history.push('/works/bulk-edit')
  }
  render() {
    if (this.state.localFiles) {
      this.state.localFiles.map((file, i) => {
        this.readAndPreview(file);
      });
    }
    return(
      <div>
        <form ref="frmUploader" encType="multipart/form-data" method="post" onSubmit={this.handleFormSubmit} action={`${C.SERVER_URL}/api/upload`} >
          <div className={`field ${this.state.localFiles.length>0?'has-addons':''}`}>
            <p className='control'>
          <div className="file">
            <label className="file-label">
              <input className="file-input" type="file" name="photos" onChange={this.handleSelectImages} multiple={true}/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fa fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose images to upload
                </span>
              </span>
            </label>
          </div>
        </p>

        {this.state.localFiles.length>0?<p className='control'><input type='submit' className='button is-primary' value='Upload Images' style={{float: 'right'}}/></p>:''}
      </div>
        </form>
        <div id='preview'>
        </div>
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
    uploadFiles: function(files){ dispatch(workActions.uploadFiles(files)); },
    setNewFiles: function(files){ dispatch(workActions.setNewFiles(files)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkPostContainer);
